import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';
import { Chart, registerables } from 'chart.js'; // Importez Chart.js

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[] = []; // Liste des événements
  isLoading = false; // Indicateur de chargement
  errorMessage: string = ''; // Message d'erreur
  chart: any; // Instance du graphique Chart.js
  showStatistics: boolean = false; // Contrôle l'affichage des statistiques

  constructor(private eventService: EventService, private router: Router) {
    Chart.register(...registerables); // Enregistrez les composants de Chart.js
  }

  ngOnInit(): void {
    this.loadEvents(); // Charge les événements au démarrage
  }

  // Charge les événements depuis le service
  loadEvents(): void {
    this.isLoading = true;
    this.eventService.getEvents().subscribe({
      next: (data: Event[]) => {
        this.events = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Erreur lors du chargement des événements :", error);
        this.errorMessage = "Erreur lors du chargement des événements.";
        this.isLoading = false;
      }
    });
  }

  // Bascule l'affichage des statistiques
  toggleStatistics(): void {
    this.showStatistics = !this.showStatistics;
    if (this.showStatistics) {
      setTimeout(() => this.generateChart(), 0); // Génère le graphique après le rendu du DOM
    } else if (this.chart) {
      this.chart.destroy(); // Détruit le graphique si les statistiques sont masquées
    }
  }

  // Génère le graphique en barres
  generateChart(): void {
    // Détruire le graphique existant s'il y en a un
    if (this.chart) {
      this.chart.destroy();
    }

    // Grouper les événements par type
    const eventTypes = this.events.map(event => event.eventType);
    const uniqueEventTypes = [...new Set(eventTypes)]; // Types d'événements uniques

    // Compter le nombre d'événements par type
    const eventCounts = uniqueEventTypes.map(type => {
      return this.events.filter(event => event.eventType === type).length;
    });

    // Créer un graphique en barres
    const ctx = document.getElementById('eventTypeChart') as HTMLCanvasElement;
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar', // Type de graphique (barres)
        data: {
          labels: uniqueEventTypes, // Types d'événements sur l'axe X
          datasets: [{
            label: 'Nombre d\'événements par type',
            data: eventCounts, // Nombre d'événements sur l'axe Y
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Couleur des barres
            borderColor: 'rgba(75, 192, 192, 1)', // Couleur des bordures
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true // Commencer l'axe Y à 0
            }
          }
        }
      });
    } else {
      console.error("Canvas non trouvé !");
    }
  }

  // Redirige vers la page de modification d'un événement
  editEvent(eventId: number): void {
    this.router.navigate(['/event/update', eventId]);
  }

  // Supprime un événement
  // Supprime un événement
deleteEvent(id: number): void {
  if (confirm('Voulez-vous vraiment supprimer cet événement ?')) {
    this.eventService.deleteEvent(id).subscribe({
      next: () => {
        // Met à jour la liste des événements après la suppression
        this.events = this.events.filter(event => event.id !== id);
        if (this.showStatistics) {
          this.generateChart(); // Régénère le graphique si les statistiques sont affichées
        }
      },
      error: (error) => {
        console.error("Erreur lors de la suppression de l'événement :", error);
        alert('Une erreur est survenue lors de la suppression.');
      }
    });
  }
}

  // Met à jour un événement dans la liste
  onEventUpdated(updatedEvent: Event): void {
    const index = this.events.findIndex(event => event.id === updatedEvent.id);
    if (index !== -1) {
      this.events[index] = updatedEvent;
      if (this.showStatistics) {
        this.generateChart(); // Régénère le graphique si les statistiques sont affichées
      }
    }
  }
}