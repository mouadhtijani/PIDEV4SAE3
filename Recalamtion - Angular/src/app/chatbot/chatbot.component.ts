import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  chatHistory: { type: 'user' | 'bot' | 'option', text: string }[] = [];
  currentStep = 0; // Track the question step

  // Predefined chatbot flow with additional questions
  steps = [
    { question: "Hello!", answer: "Hello! How can I help you today?", options: ["What is the Internship Platform?", "How do I apply?", "How can I contact support?"] },
    
    { question: "What is the Internship Platform?", answer: "It helps students find internships easily!", options: ["Are internships paid?", "Can I apply to multiple internships?", "How do I track my application?"] },
    { question: "Are internships paid?", answer: "Some internships are paid, while others offer valuable experience!", options: ["How do I find paid internships?", "What benefits do unpaid internships offer?", "Can I negotiate for a stipend?"] },
    { question: "How do I find paid internships?", answer: "Use filters on the platform to find paid opportunities!", options: [] },
    { question: "What benefits do unpaid internships offer?", answer: "Unpaid internships provide experience, networking, and skill development!", options: [] },
    { question: "Can I negotiate for a stipend?", answer: "Yes, you can discuss compensation with the employer before accepting the offer!", options: [] },

    { question: "Can I apply to multiple internships?", answer: "Yes, you can apply to as many internships as you like!", options: ["How do I manage multiple applications?", "Do companies see my other applications?", "Is there a limit to applications?"] },
    { question: "How do I manage multiple applications?", answer: "Keep track of deadlines and statuses on your dashboard!", options: [] },
    { question: "Do companies see my other applications?", answer: "No, companies do not see your other applications!", options: [] },
    { question: "Is there a limit to applications?", answer: "No, you can apply to as many as you want!", options: [] },

    { question: "How do I track my application?", answer: "You can track your application status on your dashboard.", options: ["What does 'Under Review' mean?", "How long does it take to get a response?", "Can I withdraw my application?"] },
    { question: "What does 'Under Review' mean?", answer: "It means the employer is reviewing your application!", options: [] },
    { question: "How long does it take to get a response?", answer: "Response times vary, but it typically takes 1-2 weeks!", options: [] },
    { question: "Can I withdraw my application?", answer: "Yes, you can withdraw it from your dashboard anytime!", options: [] },

    { question: "How do I apply?", answer: "Go to the 'Internships' section and click 'Apply'.", options: ["What are the requirements?", "Can I update my application?", "Is there an application deadline?"] },
    { question: "What are the requirements?", answer: "Each internship has different requirements listed on its page.", options: ["Do I need previous experience?", "Can I apply as a first-year student?", "Are there age restrictions?"] },
    { question: "Do I need previous experience?", answer: "Some internships require experience, but many accept beginners!", options: [] },
    { question: "Can I apply as a first-year student?", answer: "Yes, some internships are open to first-year students!", options: [] },
    { question: "Are there age restrictions?", answer: "Most internships require candidates to be 18 or older!", options: [] },
    
    { question: "Can I update my application?", answer: "Yes, you can edit your application before the deadline.", options: ["How do I update my resume?", "Can I change my cover letter?", "What if I submitted the wrong details?"] },
    { question: "How do I update my resume?", answer: "You can upload a new resume under your profile settings!", options: [] },
    { question: "Can I change my cover letter?", answer: "Yes, you can update your cover letter before submission!", options: [] },
    { question: "What if I submitted the wrong details?", answer: "You can edit your application before the deadline!", options: [] },
    
    { question: "Is there an application deadline?", answer: "Yes, deadlines vary by company. Check the job listing for details.", options: ["What happens if I miss the deadline?", "Can I request an extension?", "Are late applications considered?"] },
    { question: "What happens if I miss the deadline?", answer: "Unfortunately, late applications are usually not accepted!", options: [] },
    { question: "Can I request an extension?", answer: "It depends on the employer; some may allow extensions!", options: [] },
    { question: "Are late applications considered?", answer: "Usually not, but you can try reaching out to the employer!", options: [] },
    
    { question: "How can I contact support?", answer: "You can contact us via the 'Contact' section on the website.", options: ["What are the working hours?", "Is there a phone number?", "Can I email support?"] },
    { question: "What are the working hours?", answer: "Our support team is available Monday to Friday, 9 AM - 6 PM.", options: ["Is support available on weekends?", "How fast will I get a response?", "Can I get 24/7 support?"] },
    { question: "Is support available on weekends?", answer: "No, support is only available on weekdays!", options: [] },
    { question: "How fast will I get a response?", answer: "We typically respond within 24 hours!", options: [] },
    { question: "Can I get 24/7 support?", answer: "Currently, we do not offer 24/7 support!", options: [] },
    
    { question: "Is there a phone number?", answer: "Yes, you can call us at +1-234-567-8901.", options: ["What are the best times to call?", "Is there a toll-free number?", "Can I request a callback?"] },
    { question: "What are the best times to call?", answer: "Call us during working hours for a quick response!", options: [] },
    { question: "Is there a toll-free number?", answer: "No, we currently do not offer a toll-free number!", options: [] },
    { question: "Can I request a callback?", answer: "Yes, you can request a callback through our website!", options: [] },
    
    { question: "Can I email support?", answer: "Yes, send us an email at support@internshipplatform.com.", options: ["How long does it take to get a reply?", "Can I attach documents?", "Do you offer live chat support?"] },
    { question: "How long does it take to get a reply?", answer: "We typically reply within 24-48 hours!", options: [] },
    { question: "Can I attach documents?", answer: "Yes, you can attach documents to your email!", options: [] },
    { question: "Do you offer live chat support?", answer: "Yes, we have live chat available on our website!", options: [] },

    { question: "Thank you for your time!", answer: "You're welcome! Have a great day!", options: [] } // End of conversation
  ];

  constructor() {}

  // Start the chat with "Hello!"
  startChat() {
    this.chatHistory.push({ type: 'user', text: "Hello!" });
    this.chatHistory.push({ type: 'bot', text: "Hello! How can I help you today?" });
    this.showOptions();
  }

  // Show options for the current step
  showOptions() {
    if (this.currentStep < this.steps.length) {
      this.steps[this.currentStep].options.forEach(option => {
        this.chatHistory.push({ type: 'option', text: option });
      });
    }
  }

  // Handle user selection
  selectQuestion(selectedQuestion: string) {
    // Remove previous options before displaying the next step
    this.chatHistory = this.chatHistory.filter(item => item.type !== 'option');

    // Get the selected question's response
    const step = this.steps.find(s => s.question === selectedQuestion);
    
    if (step) {
      this.chatHistory.push({ type: 'user', text: step.question });
      this.chatHistory.push({ type: 'bot', text: step.answer });

      // Move to the next step
      this.currentStep++;
      this.showOptions();
    }
  }
}
