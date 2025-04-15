// src/app/backoffice/pages/dashboard/dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { ReclamationService } from 'src/app/services/reclamation.service'; // Ensure correct import
import { Reclamation } from 'src/app/reclamation.model'; // Import the Reclamation model

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  reclamations: Reclamation[] = [];

  constructor(private reclamationService: ReclamationService) {}

  ngOnInit(): void {
    this.loadReclamations();
  }

  loadReclamations(): void {
    this.reclamationService.getAll().subscribe({
      next: (data: Reclamation[]) => {
        this.reclamations = data;
      },
      error: (err) => {
        console.error('Failed to load reclamations:', err);
      }
    });
  }
}
