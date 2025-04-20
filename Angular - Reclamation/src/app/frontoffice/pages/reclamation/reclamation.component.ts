// src/app/frontoffice/pages/reclamation/reclamation.component.ts
import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../../../services/reclamation.service';
import { Reclamation } from 'src/app/models/reclamation.model';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  newReclamation: Reclamation = {
    title: '',
    description: '',
    userId: 'user123',
    userType: 'STUDENT'
  };

  reclamations: Reclamation[] = [];

  constructor(private reclamationService: ReclamationService) {}

  ngOnInit(): void {
    this.loadReclamations();
  }

  onSubmit() {
    this.reclamationService.createReclamation(this.newReclamation).subscribe({
      next: () => {
        this.newReclamation = {
          title: '',
          description: '',
          userId: 'user123',
          userType: 'STUDENT'
        };
        this.loadReclamations();
      },
      error: (err) => console.error(err)
    });
  }

  private loadReclamations() {
    this.reclamationService.getUserReclamations('user123').subscribe({
      next: (data: any) => this.reclamations = data,
      error: (err) => console.error(err)
    });
  }
}
