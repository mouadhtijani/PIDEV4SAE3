import { Component, OnInit } from '@angular/core';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { ToastrService } from 'ngx-toastr';
import { Reclamation } from 'src/app/reclamation.model'; // Importer le modèle

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  isSubmitting = false;
  reclamations: Reclamation[] = []; // Liste des réclamations
  newReclamation: Reclamation = { // Modèle pour créer une nouvelle réclamation
    typeUser: '',
    nomUser: '',
    objet: '',
    description: ''
  };

  currentUser = 'student1'; // Simuler l'utilisateur connecté
  hasReclamation = false;

  constructor(
    private reclamationService: ReclamationService, 
    private toastr: ToastrService 
  ) {}

  ngOnInit(): void {
    this.loadReclamations();
  }

  loadReclamations(): void {
    this.reclamationService.getAll().subscribe({
      next: (data) => {
        // Filtrer les réclamations pour l'utilisateur actuel
        this.reclamations = data.filter(r => r.nomUser === this.currentUser);
        this.hasReclamation = this.reclamations.length > 0;
      },
      error: () => {
        this.toastr.error('Failed to load reclamations', 'Error');
      }
    });
  }

  submit(): void {
    if (!this.newReclamation.typeUser || !this.newReclamation.nomUser || !this.newReclamation.objet || !this.newReclamation.description) {
      this.toastr.warning('Please fill all fields', 'Validation');
      return;
    }

    if (this.hasReclamation) {
      this.toastr.info('You already submitted a reclamation.', 'Notice');
      return;
    }

    this.newReclamation.nomUser = this.currentUser; // Affecter le nom de l'utilisateur

    this.reclamationService.create(this.newReclamation).subscribe({
      next: () => {
        this.toastr.success('Reclamation submitted successfully', 'Success');
        this.newReclamation = { typeUser: '', nomUser: '', objet: '', description: '' }; // Réinitialiser le formulaire
        this.loadReclamations(); // Recharger les réclamations après la soumission
      },
      error: () => this.toastr.error('Failed to submit reclamation', 'Error')
    });
  }

  delete(id: number): void {
    this.reclamationService.delete(id).subscribe({
      next: () => {
        this.toastr.info('Reclamation deleted', 'Deleted');
        this.loadReclamations(); // Recharger les réclamations après suppression
      },
      error: () => this.toastr.error('Failed to delete reclamation', 'Error')
    });
  }
}
