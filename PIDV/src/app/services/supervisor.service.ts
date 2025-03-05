import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supervisor } from '../models/supervisor';
import { Etudiant } from '../models/etudiant';

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {
  private apiUrl = 'http://localhost:8081/event/supervisors'; // URL de l'API Spring Boot

  constructor(private http: HttpClient) { }

  // Récupérer tous les superviseurs
  getAllSupervisors(): Observable<Supervisor[]> {
    return this.http.get<Supervisor[]>(this.apiUrl);
  }

  // Récupérer un superviseur par son ID
  getSupervisorById(id: number): Observable<Supervisor> {
    return this.http.get<Supervisor>(`${this.apiUrl}/${id}`);
  }

  // Ajouter un nouveau superviseur
  addSupervisor(supervisor: Supervisor): Observable<Supervisor> {
    return this.http.post<Supervisor>(this.apiUrl, supervisor);
  }

  // Mettre à jour un superviseur
  updateSupervisor(id: number, supervisor: Supervisor): Observable<Supervisor> {
    return this.http.put<Supervisor>(`${this.apiUrl}/${id}`, supervisor);
  }

  // Supprimer un superviseur
  deleteSupervisor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Assigner un étudiant à un superviseur
  assignStudentToSupervisor(supervisorId: number, etudiantId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${supervisorId}/assign/${etudiantId}`, {});
  }

  // Retirer un étudiant de la supervision d'un superviseur
  removeStudentFromSupervisor(supervisorId: number, etudiantId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${supervisorId}/remove/${etudiantId}`, {});
  }

  // Récupérer les étudiants supervisés par un superviseur
  getSupervisedStudents(supervisorId: number): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${this.apiUrl}/${supervisorId}/students`);
  }

  // Récupérer toutes les assignations
  getAllAssignations(): Observable<{ supervisor: Supervisor, etudiant: Etudiant }[]> {
    return this.http.get<{ supervisor: Supervisor, etudiant: Etudiant }[]>(`${this.apiUrl}/assignations`);
  }

  // Rechercher des superviseurs par nom ou autre critère
  searchSupervisors(query: string): Observable<Supervisor[]> {
    const params = new HttpParams().set('query', query); // Utilisation de HttpParams pour les requêtes GET avec paramètres
    return this.http.get<Supervisor[]>(`${this.apiUrl}/search`, { params });
  }

  // Pagination des superviseurs
  getSupervisorsPaginated(page: number, size: number): Observable<Supervisor[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Supervisor[]>(`${this.apiUrl}/paginated`, { params });
  }
  updateInterestStats(eventId: number, interestLevel: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${eventId}?interestLevel=${interestLevel}`, {});
  }
}