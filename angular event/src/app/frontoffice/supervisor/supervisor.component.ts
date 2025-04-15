import { Component, OnInit } from '@angular/core';
import { SupervisorService } from '../../services/supervisor.service';
import { EtudiantService } from '../../services/etudiant.service';
import { Supervisor } from '../../models/supervisor';
import { Etudiant } from '../../models/etudiant';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; 

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
    private etudiantService: EtudiantService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getSupervisors();
    this.getEtudiants();
    this.loadAssignations();
  }

  getSupervisors(): void {
    this.supervisorService.getAllSupervisors().subscribe(
      (data: Supervisor[]) => {
        this.supervisors = data;
        if (this.supervisors.length > 0) {
          this.selectedSupervisor = this.supervisors[0];
          this.editMode = true;
          this.loadSupervisedStudents(this.selectedSupervisor.id!);
        }
      },
      (error) => console.error('Erreur lors de la récupération des superviseurs:', error)
    );
  }

  getEtudiants(): void {
    this.etudiantService.getAllEtudiants().subscribe((data: Etudiant[]) => {
      this.etudiants = data;
      this.filterEtudiantsSelonAssignations(); // ✅ filtre à jour
    });
  }
  

  filterEtudiantsSelonAssignations(): void {
    if (!this.assignations || this.assignations.length === 0) return;
    
    this.etudiants = this.etudiants.filter(etud =>
      !this.assignations.some(assignation => assignation.etudiant.id === etud.id)
    );
  }
  

  addSupervisor(): void {
    if (this.newSupervisor.name && this.newSupervisor.email) {
      this.supervisorService.addSupervisor(this.newSupervisor).subscribe((supervisor: Supervisor) => {
        this.supervisors.push(supervisor);
        this.newSupervisor = { name: '', email: '' };
        this.toastr.success('Superviseur ajouté avec succès.');
      });
    }
  }

  selectSupervisor(supervisor: Supervisor): void {
    this.selectedSupervisor = { ...supervisor };
    this.editMode = true;
    this.loadSupervisedStudents(supervisor.id!);
  }

  updateSupervisor(): void {
    if (this.selectedSupervisor) {
      this.supervisorService.updateSupervisor(this.selectedSupervisor.id!, this.selectedSupervisor)
        .subscribe((updatedSupervisor: Supervisor) => {
          this.supervisors = this.supervisors.map(s =>
            s.id === updatedSupervisor.id ? updatedSupervisor : s
          );
          this.cancelEdit();
          this.toastr.success('Superviseur mis à jour.');
        });
    }
  }

  deleteSupervisor(id: number): void {
    this.supervisorService.deleteSupervisor(id).subscribe(() => {
      this.supervisors = this.supervisors.filter(s => s.id !== id);
      this.toastr.info('Superviseur supprimé.');
    });
  }

  cancelEdit(): void {
    this.editMode = false;
    this.selectedSupervisor = null;
    this.etudiantsSupervises = [];
  }

  assignStudent(): void {
    if (this.selectedSupervisor && this.selectedEtudiant) {
      const isAlreadyAssigned = this.assignations.some(assignation =>
        assignation.etudiant.id === this.selectedEtudiant!.id
      );
      if (isAlreadyAssigned) {
        this.errorMessage = 'Cet étudiant est déjà assigné à un autre superviseur.';
        this.toastr.error(this.errorMessage);
        return;
      }

      this.supervisorService.assignStudentToSupervisor(
        this.selectedSupervisor.id!,
        this.selectedEtudiant.id!
      ).subscribe(() => {
        this.toastr.success('Étudiant assigné avec succès.');

        this.etudiantsSupervises.push(this.selectedEtudiant!);
        this.etudiants = this.etudiants.filter(e => e.id !== this.selectedEtudiant!.id);
        this.assignations.push({ supervisor: this.selectedSupervisor!, etudiant: this.selectedEtudiant! });

        this.selectedEtudiant = null;
        this.errorMessage = '';
        this.getEtudiants(); // Rafraîchir la liste filtrée
      });
    }
  }

  loadSupervisedStudents(supervisorId: number): void {
    this.supervisorService.getSupervisedStudents(supervisorId).subscribe((data: Etudiant[]) => {
      this.etudiantsSupervises = data;
    });
  }

  loadAssignations(): void {
    this.supervisorService.getAllAssignations().subscribe((data) => {
      this.assignations = data;
      this.filterEtudiantsSelonAssignations();
    });
  }

  // ✅ Appelée après assignation ou suppression d’un étudiant
  refreshDataAfterChange(): void {
    this.supervisorService.getAllAssignations().subscribe((data) => {
      this.assignations = data;

      this.etudiantService.getAllEtudiants().subscribe((etuds: Etudiant[]) => {
        this.etudiants = etuds;
        this.filterEtudiantsSelonAssignations();
      });

      if (this.selectedSupervisor?.id) {
        this.loadSupervisedStudents(this.selectedSupervisor.id);
      }
    });
  }

  removeStudentFromSupervisor(supervisorId: number, etudiantId: number): void {
    this.supervisorService.removeStudentFromSupervisor(supervisorId, etudiantId).subscribe(() => {
      // 1. Recharge assignations
      this.loadAssignations();
  
      // 2. Recharge la liste des supervisés du superviseur
      this.loadSupervisedStudents(supervisorId);
  
      // 3. Recharge les étudiants disponibles
      this.getEtudiants();
  
      // 4. Optionnel : reset la sélection actuelle
      this.selectedEtudiant = null;
  
      this.toastr.info('Étudiant retiré du superviseur.');
    });
  }
  
}
