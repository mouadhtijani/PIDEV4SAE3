import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Etudiant } from '../models/etudiant';


@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private apiUrl = 'http://localhost:8081/event/api/etudiants'; // Vérifie que l'URL correspond à celle de ton API Spring Boot

  constructor(private http: HttpClient) { }

  // Récupérer tous les étudiants
  getAllEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des étudiants', error);
        return throwError(() => new Error('Erreur lors de la récupération des étudiants'));
      })
    );
  }

  // Ajouter un étudiant
  createEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.post<Etudiant>(this.apiUrl, etudiant).pipe(
      catchError(error => {
        console.error('Erreur lors de l\'ajout de l\'étudiant', error);
        return throwError(() => new Error('Erreur lors de l\'ajout de l\'étudiant'));
      })
    );
  }

  // Supprimer un étudiant
  deleteEtudiant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Erreur lors de la suppression de l\'étudiant', error);
        return throwError(() => new Error('Erreur lors de la suppression de l\'étudiant'));
      })
    );
  }
}
