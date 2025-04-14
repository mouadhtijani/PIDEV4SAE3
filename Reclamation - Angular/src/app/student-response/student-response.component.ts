import { Component } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-student-response',
  templateUrl: './student-response.component.html',
  styleUrls: ['./student-response.component.css']
})
export class StudentResponseComponent {
  studentId: string = '';
  qrCodeUrl: SafeUrl | null = null;
  errorMessage: string | null = null;

  constructor(private applicationService: ApplicationService, private sanitizer: DomSanitizer) {}

  generateQrCode(): void {
    if (!this.studentId) {
      this.errorMessage = 'Please enter a Student ID';
      return;
    }

    this.applicationService.getQrCode(this.studentId).subscribe(
      (blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.qrCodeUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.errorMessage = null;
      },
      (error) => {
        this.errorMessage = 'Enter a valid ID! ';
        this.qrCodeUrl = null;
      }
    );
  }
}
