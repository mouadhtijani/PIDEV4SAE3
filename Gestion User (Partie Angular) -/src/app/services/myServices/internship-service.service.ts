import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { InternshipResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class InternshipServiceService {

  baseUrl:string="http://localhost:8888/api/v1/internship";
  constructor(private http:HttpClient) { 
  }
  getAllInternship(token: string, params?: any): Observable<Array<InternshipResponse>> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Array<InternshipResponse>>(`${this.baseUrl}`, { headers }).pipe(
      map((res: Array<InternshipResponse>) => res)
    );
  }
}
