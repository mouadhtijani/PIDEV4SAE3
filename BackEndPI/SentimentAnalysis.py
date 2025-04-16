import time
import torch #gérer les modèles Deep Learning
from flask import Flask, request, jsonify  #créer une API web
from flask_cors import CORS
from transformers import DistilBertForSequenceClassification, DistilBertTokenizerFast # analyse des sentiments
from langchain_groq import ChatGroq
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain_community.vectorstores import FAISS #indexation vectorielle rapide
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.embeddings import HuggingFaceEmbeddings  #convertir les textes en vecteurs
from groq import Groq # pour la détection d’images
import base64
import mimetypes
import os

app = Flask(__name__)
CORS(app)

# Load model and tokenizer
model = DistilBertForSequenceClassification.from_pretrained("distilbert-base-uncased-finetuned-sst-2-english") #sentiment analysis model from haging face (plateforme)
tokenizer = DistilBertTokenizerFast.from_pretrained("distilbert-base-uncased") #transformation du texte en vecteur

llm = ChatGroq(groq_api_key="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", model_name="Llama3-8b-8192") #large language model llm:lama3 la moderation d'image
client = Groq(api_key="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")
UPLOAD_FOLDER = './uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def encode_image_to_base64(image_path):
    """Encode the image to base64 format."""
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image not found: {image_path}")
    with open(image_path, "rb") as img_file:
        return base64.b64encode(img_file.read()).decode("utf-8")

def get_mime_type(image_path):
    """récupération du type MIME pour l’envoi à l’API Groq"""
    mime_type, _ = mimetypes.guess_type(image_path)
    return mime_type or "image/jpeg"

#prompts pour llm pour repondre au questions du pdf
prompt = ChatPromptTemplate.from_template(
    """
    Answer the questions based on the provided context only. Please provide the most accurate response based on the question.
    <context>
    {context}
    </context>
    Question: {input}
    """
)

# Vector embedding function
def vector_embedding():
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    loader = PyPDFLoader(r"C:\Users\msi\Desktop\HazemModifier\Hazem11\Hazem\BackEndPI\pdfs\Data_Science_Career_Guide.pdf")  # Ensure this folder exists with your PDFs
    docs = loader.load()
    if not docs:
        print("Error: No documents loaded.")
        return None
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    final_documents = text_splitter.split_documents(docs[:20])
    vectors = FAISS.from_documents(final_documents, embeddings)#embeding du pdf et enregistrer les vecteurs dans un vector store faiss
    return vectors

@app.route('/analyze', methods=['POST'])
#Prend un texte JSON et Renvoie le résultat JSON
def analyze_sentiment():
    try:
        data = request.get_json()
        print(f" Received data: {data}")  # debug print

        text = data.get("text")

        if not text:
            return jsonify({"error": "No text provided"}), 400

        # Tokenize input
        inputs = tokenizer(text, return_tensors="pt")
        with torch.no_grad():
            outputs = model(**inputs)

        logits = outputs.logits
        predicted_class = torch.argmax(logits).item()

        # Map class to sentiment
        if predicted_class == 1:
            sentiment = "Positive"
        elif predicted_class == 0:
            sentiment = "Negative"
        else:
            sentiment = f"Unknown (class {predicted_class})"

        print(f" Text: '{text}' → Sentiment: {sentiment}")  # log result

        return jsonify({"sentiment": sentiment})

    except Exception as e:
        print(f" Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/rag-query', methods=['POST']) #rag chatbot function
def rag_query():
    try:
        data = request.get_json()
        query = data.get("query", "what are the different job roles of data science?")
        print(f"Received query: {query}")

        # Start embedding the documents
        print("Processing and embedding documents...")
        start_time = time.time()
        vectors = vector_embedding()
        end_time = time.time()
        print(f"Documents embedded in {end_time - start_time:.2f} seconds.")

        if not vectors:
            print("Error: No vectors returned from embedding process.")
            return jsonify({"error": "Failed to process documents."}), 400

        retriever = vectors.as_retriever()
        document_chain = create_stuff_documents_chain(llm, prompt)
        retrieval_chain = create_retrieval_chain(retriever, document_chain)

        # Log query processing time
        print(f"\nQuery: {query}")
        response_start = time.time()
        response = retrieval_chain.invoke({'input': query})
        response_end = time.time()

        # Log the response
        print("/nAnswer:")
        print(response['answer'])

        # Log segments for better insight into documents being retrieved
        segments = [doc.page_content for doc in response['context']]
        if not segments:
            print("Error: No relevant document segments returned.")
            return jsonify({"error": "No relevant document segments."}), 400

        return  response['answer']

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/detect', methods=['POST'])
def detect_nsfw():
    """Detect harmful content in the image using Groq AI."""
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save the uploaded file to the server
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(image_path)

    image_b64 = encode_image_to_base64(image_path)
    mime_type = get_mime_type(image_path)

    # Create base64 image URL for Groq API
    base64_url = f"data:{mime_type};base64,{image_b64}"

    # Call Groq API for image analysis
    #envoie une requête à l'API Groq pour analyser une image (codée en base64)
    # modèle LLaMA 4 Scout afin de déterminer si elle contient du contenu NSFW ou violent.


    try:
        response = client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            temperature=0,
            max_completion_tokens=1024,
            top_p=1,
            stream=False,
            stop=None,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": (
                                "You are a content moderation AI. Your task is to examine the image below and detect "
                                "if it contains any harmful, explicit, violent, or NSFW content (e.g., weapons such as knives, "
                                "guns, kitchen knives, or other dangerous objects, as well as blood, gore, fighting, or nudity). If the image contains "
                                "anything harmful or explicit, respond with 'yes' followed by a brief reason. If not, respond 'no'."
                            )
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": base64_url
                            }
                        }
                    ]
                }
            ]
        )

        detection_result = response.choices[0].message.content
        return detection_result


    except Exception as e:
        return jsonify({"error": str(e)}), 500


#serveur Flask localement sur le port 5001

if __name__ == '__main__':
    app.run(port=5001, debug=True)
