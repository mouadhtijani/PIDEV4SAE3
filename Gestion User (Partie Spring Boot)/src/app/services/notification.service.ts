import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'http://localhost:9090/notifications';

  constructor(private http: HttpClient) {}

  getNotifications(communityId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?communityId=${communityId}`);
  }
}
