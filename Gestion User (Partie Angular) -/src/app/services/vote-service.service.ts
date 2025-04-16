import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteServiceService {

  constructor(private http: HttpClient) {}

  vote(postId: number, voteType: string,userId:number): Observable<void> {
    return this.http.post<void>(`http://localhost:9090/votes/${postId}?voteType=${voteType}&user=${userId}`, {});
  }
}
