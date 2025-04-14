import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReclamationService, Reclamation } from '../services/reclamation.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  reclamations: Reclamation[] = []; // List of user's reclamations
  newReclamation: Reclamation = { // Model for creating new reclamation
    typeUser: '',
    nomUser: '',
    objet: '',
    description: ''
  };

  currentUser = 'student1'; // Simulate logged-in user
  hasReclamation = false;

  constructor(
    private reclamationService: ReclamationService, // Service to interact with reclamations
    private toastr: ToastrService // For showing notifications
  ) {}

  ngOnInit(): void {
    this.loadReclamations();
  }

  loadReclamations(): void {
    this.reclamationService.getAll().subscribe({
      next: (data) => {
        // Filter reclamations for the current user
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

    this.newReclamation.nomUser = this.currentUser;

    this.reclamationService.create(this.newReclamation).subscribe({
      next: () => {
        this.toastr.success('Reclamation submitted successfully', 'Success');
        this.newReclamation = { typeUser: '', nomUser: '', objet: '', description: '' };
        this.loadReclamations();
      },
      error: () => this.toastr.error('Failed to submit reclamation', 'Error')
    });
  }

  delete(id: number): void {
    this.reclamationService.delete(id).subscribe({
      next: () => {
        this.toastr.info('Reclamation deleted', 'Deleted');
        this.loadReclamations();
      },
      error: () => this.toastr.error('Failed to delete reclamation', 'Error')
    });
  }
}
