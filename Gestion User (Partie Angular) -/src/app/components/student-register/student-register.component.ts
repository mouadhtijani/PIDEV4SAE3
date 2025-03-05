import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Classe } from 'src/app/enums/classe.enum';
import { Level } from 'src/app/enums/level.enum';
import { Speciality } from 'src/app/enums/speciality.enum';
import { UserControllerService } from 'src/app/services/services';
import { environment } from 'src/environment.prod';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {
  selectedFileCV: any;
  userId: any;
  token: any;
  submitted = false;
  uriCV: any;

  // Form fields
  maxDate = "2005-01-01";
  myspecialities = Object.values(Speciality);
  myclasse = Object.values(Classe);
  mylevel = Object.values(Level);
  selectedSpeciality: any;
  selectedClasse: any;
  selectedLevel: any;
  role: String = "";
  birthdate: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserControllerService
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('id_user');
    this.role = localStorage.getItem('role') as string;
    this.token = localStorage.getItem('token') as string;
  }

  onFileSelected(event: any) {
    this.selectedFileCV = event.target.files[0];
  }

  save() {
    this.submitted = true;
    
    // Vérification manuelle de la validité du formulaire
    const formValid = this.selectedLevel && 
                     this.selectedClasse && 
                     this.selectedSpeciality && 
                     this.birthdate;

    if (!formValid) {
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const formData = new FormData();
    
    formData.append("birthdate", this.birthdate);
    formData.append("level", this.selectedLevel);
    formData.append("classe", this.selectedClasse);
    formData.append("studentCV", this.selectedFileCV);
    formData.append("speciality", this.selectedSpeciality);

    this.http.put(`${environment.apiUrl}/api/v1/user/student/${this.userId}`, formData, { headers })
      .subscribe(res => {
        console.log("updated ");
        this.router.navigate(['/login']);
      });
  }
}