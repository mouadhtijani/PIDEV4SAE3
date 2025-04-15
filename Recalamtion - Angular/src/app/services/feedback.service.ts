import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Feedback {
  id?: number;
  internshipId: number;
  comment: string;
  rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:8085/feedbacks';

  constructor(private http: HttpClient) {}

  addFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.apiUrl}/add`, feedback);
  }

  getFeedbackByInternship(internshipId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/internship/${internshipId}`);
  }
  
  
}
