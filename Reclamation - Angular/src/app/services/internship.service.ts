import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Internship {
imageUrl: any;
  internshipId: number;
  title: string;
  description: string;
  location: string;
  company: string;
  deadline: string;
  internshipType: string;
  internshipStatus: string;
}

@Injectable({
  providedIn: 'root'
})
export class InternshipService {
  private apiUrl = 'http://localhost:8083/api/internships'; // Ensure this matches backend

  constructor(private http: HttpClient) {}

  getInternships(): Observable<Internship[]> {
    return this.http.get<Internship[]>(this.apiUrl).pipe(
      tap(data => console.log('Internships received:', data))
    );
  }
}
