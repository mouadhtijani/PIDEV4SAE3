import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../../../services/reclamation.service';
import { Reclamation } from 'src/app/models/reclamation.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
  qrCodeUrl: SafeUrl | null = null;

  constructor(
    private reclamationService: ReclamationService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadReclamations();
  }

  onSubmit() {
    this.reclamationService.createReclamation(this.newReclamation).subscribe({
      next: (data) => {
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

  loadReclamations() {
    this.reclamationService.getUserReclamations('user123').subscribe({
      next: (data: any) => {
        this.reclamations = data;

        if (this.reclamations.length > 0 && this.reclamations[0].id) {
          this.loadQRCode(this.reclamations[0].id.toString());  // Pass the ID as a string
        }
      },
      error: (err) => console.error(err)
    });
  }

  loadQRCode(reclamationId: string) {
    this.reclamationService.getQRCode(reclamationId).subscribe({
      next: (data: Blob) => {
        const objectURL = URL.createObjectURL(data);
        this.qrCodeUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: (err) => console.error(err)
    });
  }
}
