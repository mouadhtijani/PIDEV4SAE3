import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private baseUrl: string = 'http://localhost:9090/statistics'; // Update this if your backend is hosted elsewhere

  constructor(private http: HttpClient) { }

  // Existing method to get the number of threads in a community
  getNumberOfThreads(communityId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/threads/${communityId}`);
  }

  // Existing method to get the number of posts (replies) in a community
  getNumberOfPosts(communityId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/posts/${communityId}`);
  }

  // New method to get the total number of communities
  getNumberOfCommunities(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/communities`);
  }

  // New method to get the total number of posts (across all communities)
  getTotalNumberOfPosts(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/posts`);
  }
}
