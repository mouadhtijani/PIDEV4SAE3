import cv2
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows cross-origin requests from Angular (e.g., http://localhost:4200)

# Load the face detection model (try alt2 if detection is weak)
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_alt2.xml')

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.json
        filename = data.get("filename")  # Absolute or relative file path

        if not filename:
            return jsonify({"error": "No filename provided"}), 400

        if not os.path.exists(filename):
            return jsonify({"error": f"File not found: {filename}"}), 400

        # Read image
        img = cv2.imread(filename)
        if img is None:
            return jsonify({"error": f"Could not read image: {filename}"}), 400

        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        # Face detection
        faces = face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.1,
            minNeighbors=5,
            minSize=(30, 30),
            flags=cv2.CASCADE_SCALE_IMAGE
        )

        face_count = len(faces)
        suspicious = face_count != 1

        print(f"🔍 Analysis: {filename} → Faces: {face_count}, Suspicious: {suspicious}")

        return jsonify({
            "face_count": face_count,
            "suspicious": suspicious
        })

    except Exception as e:
        print(f"❌ Error analyzing image: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)
