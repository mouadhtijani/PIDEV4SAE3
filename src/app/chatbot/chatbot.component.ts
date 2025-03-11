import { Component } from '@angular/core';
import { ChatbotService } from '../services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  userQuestion: string = '';
  chatHistory: { question: string; answer: string }[] = [];

  constructor(private chatbotService: ChatbotService) {}

  sendMessage() {
    if (this.userQuestion.trim() === '') return;

    const question = this.userQuestion;
    this.chatHistory.push({ question, answer: '...' });

    this.chatbotService.getResponse(question).subscribe(response => {
      this.chatHistory[this.chatHistory.length - 1].answer = response;
    });

    this.userQuestion = ''; // Clear input after sending
  }
}
