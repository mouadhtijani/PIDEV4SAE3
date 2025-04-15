import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private baseUrl = 'http://localhost:8086/api/chatbot';

  constructor(private http: HttpClient) {}

  // Get response from chatbot
  getResponse(question: string): Observable<string> {
    const params = new HttpParams().set('question', question);
    return this.http.get(`${this.baseUrl}/ask`, { params, responseType: 'text' });
  }

  // Get all chatbot messages (for admin panel)
  getAllMessages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/messages`);
  }

  // Add a new chatbot message
  addMessage(question: string, answer: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add`, { question, answer });
  }

  // Update chatbot message
  updateMessage(id: number, question: string, answer: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update/${id}`, { question, answer });
  }

  // Delete chatbot message
  deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
