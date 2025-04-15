import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = 'http://localhost:8084/applications'; // Assure-toi que c'est le bon port

  constructor(private http: HttpClient) {}

  submitApplication(
    studentId: string,
    internshipId: number,
    submissionDate: string,
    interviewDate: string | null,
    cvFile: File
  ): Observable<any> {
    const formData = new FormData();
    formData.append('studentId', studentId);
    formData.append('internshipId', internshipId.toString());
    formData.append('submissionDate', submissionDate);
    if (interviewDate) {
      formData.append('interviewDate', interviewDate);
    }
    formData.append('cv', cvFile);

    return this.http.post<any>(this.apiUrl, formData);
  }
  getApplications(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateApplicationStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/application-status/${id}?status=${status}`, {});
  }

  deleteApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getQrCode(studentId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/status/qr/${studentId}`, { responseType: 'blob' });
  }
    searchApplications(studentId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search?studentId=${studentId}`);
  }
  
}
