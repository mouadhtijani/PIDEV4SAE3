import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  vote(postId: number, voteType: string) {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://localhost:9090/posts';

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getPostById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getPostsByCommunityId(communityId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/community/${communityId}`);
  }

  createPost(post: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, post);
  }

  updatePost(id: number, post: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getRepliesByPostId(postId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${postId}/replies`);
  }
}
