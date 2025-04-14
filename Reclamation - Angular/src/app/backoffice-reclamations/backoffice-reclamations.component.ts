import { Component, OnInit } from '@angular/core';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { ResponseService } from 'src/app/services/response.service';  // Service pour gérer les réponses

@Component({
  selector: 'app-backoffice-reclamations',
  templateUrl: './backoffice-reclamations.component.html',
  styleUrls: ['./backoffice-reclamations.component.css']
})
export class BackofficeReclamationsComponent implements OnInit {
  reclamations: any[] = []; // Liste des réclamations
  message: string = '';  // Message pour répondre à une réclamation
  selectedReclamationId: number | null = null; // ID de la réclamation sélectionnée pour réponse

  constructor(
    private reclamationService: ReclamationService,
    private responseService: ResponseService
  ) {}

  ngOnInit(): void {
    this.loadReclamations();  // Charger les réclamations au démarrage
  }

  // Méthode pour charger toutes les réclamations
  loadReclamations() {
    this.reclamationService.getAllReclamations().subscribe(data => {
      this.reclamations = data;  // Affecte les réclamations récupérées à la variable 'reclamations'
    });
  }

  // Méthode pour répondre à une réclamation
  respondToReclamation(reclamationId: number) {
    if (this.message.trim()) {
      this.responseService.addResponse(reclamationId, this.message).subscribe(response => {
        // Réinitialiser le message et l'ID de réclamation après l'ajout de la réponse
        this.message = '';
        this.selectedReclamationId = null;
        this.loadReclamations();  // Recharger les réclamations pour afficher la nouvelle réponse
      });
    } else {
      alert('Veuillez entrer un message de réponse.');
    }
  }

  // Sélectionner la réclamation pour y répondre
  selectReclamationForResponse(reclamationId: number) {
    this.selectedReclamationId = reclamationId;  // Définit l'ID de la réclamation sélectionnée
  }
}
