import { Component, OnInit } from '@angular/core';
import { SupervisorService } from '../../services/supervisor.service';
import { EtudiantService } from '../../services/etudiant.service';
import { Supervisor } from '../../models/supervisor';
import { Etudiant } from '../../models/etudiant';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})
export class SupervisorComponent implements OnInit {
  supervisors: Supervisor[] = [];
  etudiants: Etudiant[] = [];
  etudiantsSupervises: Etudiant[] = [];
  assignations: { supervisor: Supervisor, etudiant: Etudiant }[] = [];
  
  newSupervisor: Supervisor = { name: '', email: '' };
  selectedSupervisor: Supervisor | null = null;
  selectedEtudiant: Etudiant | null = null;
  editMode: boolean = false;
  errorMessage: string = '';

  constructor(
    private supervisorService: SupervisorService,
    private etudiantService: EtudiantService
  ) { }

  ngOnInit(): void {
    this.getSupervisors();
    this.getEtudiants();
    this.loadAssignations();
  }

  // Récupérer tous les superviseurs
   getSupervisors(): void {
    this.supervisorService.getAllSupervisors().subscribe(
      (data: Supervisor[]) => {
        console.log('Superviseurs récupérés:', data);
        this.supervisors = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des superviseurs:', error);
      }
    );
  }
  // Récupérer tous les étudiants
  getEtudiants(): void {
    this.etudiantService.getAllEtudiants().subscribe((data: Etudiant[]) => {
      this.etudiants = data;
    });
  }

  // Ajouter un nouveau superviseur
  addSupervisor(): void {
    if (this.newSupervisor.name && this.newSupervisor.email) {
      this.supervisorService.addSupervisor(this.newSupervisor).subscribe((supervisor: Supervisor) => {
        this.supervisors.push(supervisor);
        this.newSupervisor = { name: '', email: '' }; // Réinitialiser le formulaire
      });
    }
  }

  // Sélectionner un superviseur pour modification
  selectSupervisor(supervisor: Supervisor): void {
    this.selectedSupervisor = { ...supervisor };
    this.editMode = true;
    this.loadSupervisedStudents(supervisor.id!);
  }

  // Mettre à jour un superviseur
  updateSupervisor(): void {
    if (this.selectedSupervisor) {
      this.supervisorService.updateSupervisor(this.selectedSupervisor.id!, this.selectedSupervisor)
        .subscribe((updatedSupervisor: Supervisor) => {
          this.supervisors = this.supervisors.map(s =>
            s.id === updatedSupervisor.id ? updatedSupervisor : s
          );
          this.cancelEdit();
        });
    }
  }

  // Supprimer un superviseur
  deleteSupervisor(id: number): void {
    this.supervisorService.deleteSupervisor(id).subscribe(() => {
      this.supervisors = this.supervisors.filter(s => s.id !== id);
    });
  }

  // Annuler la modification
  cancelEdit(): void {
    this.editMode = false;
    this.selectedSupervisor = null;
    this.etudiantsSupervises = [];
  }

  // Assigner un étudiant à un superviseur
  assignStudent(): void {
    if (this.selectedSupervisor && this.selectedEtudiant) {
      const isAlreadyAssigned = this.assignations.some(assignation => assignation.etudiant.id === this.selectedEtudiant!.id);
      if (isAlreadyAssigned) {
        this.errorMessage = 'Cet étudiant est déjà assigné à un autre superviseur.';
        return;
      }

      this.supervisorService.assignStudentToSupervisor(this.selectedSupervisor.id!, this.selectedEtudiant.id!)
        .subscribe(() => {
          this.etudiantsSupervises.push(this.selectedEtudiant!);
          this.etudiants = this.etudiants.filter(e => e.id !== this.selectedEtudiant!.id);
          this.assignations.push({ supervisor: this.selectedSupervisor!, etudiant: this.selectedEtudiant! });
          this.errorMessage = '';
          this.selectedEtudiant = null; // Réinitialiser la sélection
        });
    }
  }

  // Charger les étudiants supervisés par un superviseur
  loadSupervisedStudents(supervisorId: number): void {
    this.supervisorService.getSupervisedStudents(supervisorId).subscribe((data: Etudiant[]) => {
      this.etudiantsSupervises = data;
    });
  }

  // Charger toutes les assignations
  loadAssignations(): void {
    this.supervisorService.getAllAssignations().subscribe((data: { supervisor: Supervisor, etudiant: Etudiant }[]) => {
      this.assignations = data;
    });
  }

  // Retirer un étudiant de la supervision d'un superviseur
  removeStudentFromSupervisor(supervisorId: number, etudiantId: number): void {
    this.supervisorService.removeStudentFromSupervisor(supervisorId, etudiantId).subscribe(() => {
      this.etudiantsSupervises = this.etudiantsSupervises.filter(e => e.id !== etudiantId);
      this.assignations = this.assignations.filter(a => a.etudiant.id !== etudiantId);
      this.getEtudiants(); // Recharger la liste des étudiants disponibles
    });
  }
} 