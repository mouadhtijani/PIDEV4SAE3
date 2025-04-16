import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReplyService {
  private apiUrl = 'http://localhost:9090/replies';

  constructor(private http: HttpClient) {}

  getAllReplies(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getReplyById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createReply(reply: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, reply);
  }

  updateReply(id: number, reply: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, reply);
  }

  deleteReply(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
