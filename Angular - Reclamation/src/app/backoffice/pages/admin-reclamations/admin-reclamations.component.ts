import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../../../services/reclamation.service';
import { HistoryService } from 'src/app/services/history.service';
import { HistoryEntry } from 'src/app/models/history-entry.model';
import { HttpClient } from '@angular/common/http';  // Import HttpClient


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
    private historyService: HistoryService,
    private http: HttpClient 
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

// Function to download Excel file
downloadExcel() {
  this.http.get('http://localhost:8095/api/admin/reclamations/history/export', { responseType: 'arraybuffer' })
    .subscribe((response: ArrayBuffer) => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'history.xlsx'; // Set the filename for the download
      link.click(); // Trigger the download
    }, (error: any) => {
      console.error('Error downloading Excel file', error);  // Explicit type for error
    });
}
}




