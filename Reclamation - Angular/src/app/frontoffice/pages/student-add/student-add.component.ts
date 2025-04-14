import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent {
  studentForm: FormGroup; // ✅ Make sure this exists!

  constructor(private fb: FormBuilder, private studentService: StudentService) {
    this.studentForm = this.fb.group({  // ✅ Initialize it here!
      name: ['', [Validators.required, Validators.minLength(3)]],
      major: ['', Validators.required],
      cv: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      gpa: ['', [Validators.required, Validators.min(0), Validators.max(4)]]
    });
  }

  addStudent() {
    if (this.studentForm.valid) {
      this.studentService.addStudent(this.studentForm.value).subscribe(
        () => {
          alert('Étudiant ajouté avec succès !'); // Success alert
          this.studentForm.reset(); // Reset the form
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'étudiant', error); // Log the error
          alert('Erreur lors de l\'ajout de l\'étudiant. Veuillez réessayer.'); // Error alert
        }
      );
    } else {
      alert('Veuillez corriger les erreurs dans le formulaire.'); // Form validation alert
    }
  }
}   
