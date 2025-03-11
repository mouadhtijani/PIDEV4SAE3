import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {
  studentId: string = '';
  internshipId: number | null = null;
  submissionDate: string = new Date().toISOString().split('T')[0]; // Date du jour
  interviewDate: string | null = null;
  cvFile: File | null = null;
  isSubmitting: boolean = false;

  // Flags de validation
  studentIdInvalid: boolean = false;
  submissionDateInvalid: boolean = false;
  interviewDateInvalid: boolean = false;
  cvInvalid: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.internshipId = +params['id']; 
    });
  }

  validateStudentId() {
    const regex = /^[a-zA-Z0-9]+$/;
    this.studentIdInvalid = !regex.test(this.studentId);
  }

  validateDates() {
    const today = new Date().toISOString().split('T')[0];
    this.submissionDateInvalid = this.submissionDate < today;

    if (this.interviewDate) {
      this.interviewDateInvalid = this.interviewDate <= this.submissionDate;
    } else {
      this.interviewDateInvalid = false;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file && file.type !== 'application/pdf') {
      this.cvInvalid = true;
      this.cvFile = null;
    } else {
      this.cvInvalid = false;
      this.cvFile = file;
    }
  }

  submitApplication() {
    // Vérification des champs vides
    if (!this.studentId || !this.internshipId || !this.submissionDate || !this.cvFile) {
      alert("Veuillez remplir tous les champs obligatoires avant de soumettre.");
      return;
    }
  
    // Vérifier si les validations sont OK
    if (this.studentIdInvalid || this.submissionDateInvalid || this.interviewDateInvalid || this.cvInvalid) {
      alert("Veuillez corriger les erreurs dans le formulaire avant de soumettre.");
      return;
    }
  
    this.isSubmitting = true;
  
    this.applicationService.submitApplication(
      this.studentId,
      this.internshipId!,
      this.submissionDate,
      this.interviewDate,
      this.cvFile
    ).subscribe(
      response => {
        alert('Candidature envoyée avec succès !');
        this.isSubmitting = false;
        this.router.navigate(['/internships']);
      },
      error => {
        alert("Erreur lors de l'envoi. Veuillez réessayer.");
        this.isSubmitting = false;
      }
    );
  }
  
}
