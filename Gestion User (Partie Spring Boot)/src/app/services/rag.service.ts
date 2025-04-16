import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RagService {
  private apiUrl = 'http://localhost:9090/chat/rag';

  constructor(private http: HttpClient) {}

  getAnswer(query: string): Observable<string> {
    return this.http.post(this.apiUrl, { query }, { responseType: 'text' });
  }
}
