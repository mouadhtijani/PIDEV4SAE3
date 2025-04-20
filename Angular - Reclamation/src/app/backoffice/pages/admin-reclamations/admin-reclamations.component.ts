import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../../../services/reclamation.service';

@Component({
  selector: 'app-admin-reclamations',
  templateUrl: './admin-reclamations.component.html',
  styleUrls: ['./admin-reclamations.component.css']
})
export class AdminReclamationsComponent implements OnInit {
  reclamations: any[] = [];

  constructor(private reclamationService: ReclamationService) { }

  ngOnInit(): void {
    this.loadReclamations();
  }

  updateResponse(id: number, response: string) {
    this.reclamationService.updateAdminResponse(id, response).subscribe({
      next: () => {
        // Recharger les données après mise à jour
        this.loadReclamations();
      },
      error: (err) => console.error(err)
    });
  }

  private loadReclamations() {
    this.reclamationService.getAdminReclamations().subscribe({
      next: (data: any) => {
        // Filtrer les réclamations non résolues
        this.reclamations = data.filter((rec: any) => rec.status !== 'RESOLVED');
      },
      error: (err) => console.error(err)
    });
  }
}