import { Component, OnInit } from '@angular/core';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { ToastrService } from 'ngx-toastr';
import { Reclamation } from 'src/app/reclamation.model';

@Component({
  selector: 'app-reclamation-management',
  templateUrl: './reclamation-management.component.html',
  styleUrls: ['./reclamation-management.component.css']
})
export class ReclamationManagementComponent implements OnInit {
  reclamations: Reclamation[] = []; // Liste des réclamations
  isLoading = false;

  constructor(
    private reclamationService: ReclamationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadReclamations(); // Charger les réclamations au démarrage
  }

  loadReclamations(): void {
    this.isLoading = true;
    this.reclamationService.getAll().subscribe({
      next: (data) => {
        console.log('Reclamations loaded:', data);
        this.reclamations = data;  // Stocke les réclamations récupérées
      },
      error: () => {
        this.toastr.error('Failed to load reclamations', 'Error');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  // Méthode pour répondre à une réclamation
  respondToReclamation(reclamationId: number): void {
    const responseMessage = prompt('Enter your response message:'); // Demande à l'utilisateur d'entrer un message
    if (responseMessage) {
      this.reclamationService.addResponse(reclamationId, responseMessage).subscribe({
        next: (response) => {
          console.log('Response added:', response);
          this.toastr.success('Reclamation responded successfully');
          this.loadReclamations();  // Recharge les réclamations après avoir répondu
        },
        error: (err) => {
          console.error('Error responding to reclamation:', err);
          this.toastr.error('Failed to respond to reclamation');
        }
      });
    }
  }

  // Méthode pour supprimer une réclamation
  deleteReclamation(id: number): void {
    this.reclamationService.delete(id).subscribe({
      next: () => {
        this.toastr.success('Reclamation deleted successfully');
        this.loadReclamations();  // Recharge les réclamations après suppression
      },
      error: () => {
        this.toastr.error('Failed to delete reclamation', 'Error');
      }
    });
  }
}
