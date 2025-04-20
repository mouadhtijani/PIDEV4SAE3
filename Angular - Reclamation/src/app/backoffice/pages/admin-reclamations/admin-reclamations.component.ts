import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../../../services/reclamation.service';
import { HistoryService } from 'src/app/services/history.service';
import { HistoryEntry } from 'src/app/models/history-entry.model';

@Component({
  selector: 'app-admin-reclamations',
  templateUrl: './admin-reclamations.component.html',
  styleUrls: ['./admin-reclamations.component.css']
})
export class AdminReclamationsComponent implements OnInit {
  reclamations: any[] = [];
  history: HistoryEntry[] = [];

  constructor(
    private reclamationService: ReclamationService,
    private historyService: HistoryService
  ) {}

  ngOnInit(): void {
    this.loadReclamations();
    this.loadHistory();
  }

  loadHistory() {
    this.historyService.getHistory().subscribe({
      next: (data) => this.history = data,
      error: (err) => console.error(err)
    });
  }

  updateResponse(id: number, response: string) {
    this.reclamationService.updateAdminResponse(id, response).subscribe({
      next: () => this.loadReclamations(),
      error: (err) => console.error(err)
    });
  }

  private loadReclamations() {
    this.reclamationService.getAdminReclamations().subscribe({
      next: (data: any) => {
        this.reclamations = data.filter((rec: any) => rec.status !== 'RESOLVED');
      },
      error: (err) => console.error(err)
    });
  }
}
