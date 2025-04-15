import { Component, OnInit } from '@angular/core';
import { EtudiantService } from '../../services/etudiant.service';
import { Etudiant } from '../../models/etudiant';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {
  etudiants: Etudiant[] = [];
  etudiantsFiltres: Etudiant[] = []; // Liste filtrée et triée
  searchTerm: string = '';  // Terme de recherche
  sortBy: keyof Etudiant = 'nom';  // Critère de tri par défaut
  sortDirection: 'asc' | 'desc' = 'asc'; // Direction du tri

  filieres: string[] = [
    'Informatique',
    'Mathématiques appliquées',
    'Génie civil',
    'Médecine',
    'Droit',
    'Sciences sociales',
    'Economie',
    'Ingénierie électronique',
    'Chimie',
    'Biologie',
    'Arts et lettres',
    'Sciences politiques',
    'Sciences de gestion'
  ];

  // Nouvelle entrée d'étudiant
  newEtudiant: Etudiant = {
    nom: '',
    prenom: '',
    email: '',
    filiere: '',
    annee: 1
  };

  constructor(private etudiantService: EtudiantService) {}

  ngOnInit(): void {
    this.getEtudiants();
  }

  // Récupérer les étudiants depuis l'API
  getEtudiants(): void {
    this.etudiantService.getAllEtudiants().subscribe(
      (data: Etudiant[]) => {
        this.etudiants = data;
        this.filterEtudiants(); // Appliquer le filtre et le tri
      },
      (error) => {
        console.error('Erreur lors de la récupération des étudiants', error);
      }
    );
  }

  // Filtrer les étudiants en fonction du terme de recherche
  filterEtudiants(): void {
    this.etudiantsFiltres = this.etudiants.filter(etudiant =>
      etudiant.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      etudiant.prenom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      etudiant.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.sortEtudiants(); // Trier après filtrage
  }

  // Trier les étudiants
  sortEtudiants(): void {
    this.etudiantsFiltres.sort((a, b) => {
      const valueA = a[this.sortBy] ?? '';
      const valueB = b[this.sortBy] ?? '';

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else {
        return this.sortDirection === 'asc' ? Number(valueA) - Number(valueB) : Number(valueB) - Number(valueA);
      }
    });
  }

  // Changer le critère de tri
  changeSortBy(field: keyof Etudiant): void {
    if (this.sortBy === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.sortDirection = 'asc';
    }
    this.sortEtudiants();
  }

  // Ajouter un étudiant
  addEtudiant(): void {
    if (!this.newEtudiant.nom || !this.newEtudiant.prenom || !this.newEtudiant.email || !this.newEtudiant.filiere) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
  
    // Supprimer l'ID avant d'envoyer l'étudiant
    const etudiantSansId = { ...this.newEtudiant };
    delete etudiantSansId.id;  // Si l'ID est défini, on le supprime avant d'envoyer
  
    this.etudiantService.createEtudiant(etudiantSansId).subscribe({
      next: (data: Etudiant) => {
        console.log('Etudiant ajouté:', data);  // Log des données retournées
        this.etudiants.push(data);  // Ajouter l'étudiant à la liste
        this.filterEtudiants();  // Appliquer le filtre et le tri
        this.resetNewEtudiant();  // Réinitialiser le formulaire
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de l\'étudiant', error);
        alert(`Erreur: ${error.status} - ${error.message}`);
      }
    });
  }
  
  

  // Réinitialiser le formulaire d'ajout
  resetNewEtudiant(): void {
    this.newEtudiant = { nom: '', prenom: '', email: '', filiere: '', annee: 1 };
  }

  // Supprimer un étudiant
  deleteEtudiant(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cet étudiant ?')) {
      this.etudiantService.deleteEtudiant(id).subscribe(() => {
        this.etudiants = this.etudiants.filter(etudiant => etudiant.id !== id);
        this.filterEtudiants(); // Met à jour la liste après suppression
      });
    }
  }
}
