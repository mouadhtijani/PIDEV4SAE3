import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domaine } from 'src/app/enums/domaine.enum';
import { CompanyControllerService } from 'src/app/services/services';
import { environment } from 'src/environment.prod';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css']
})
export class CompanyRegisterComponent implements OnInit {
  selectedFile: any;
  submitted = false;
  
  // Form fields
  userId: any;
  role: string = "";
  token: string = "";
  companyName: string = "";
  companyTelephone: string = "";
  companyEmail: string = "";
  companyWebSite: string = "";
  companyadress: string = "";
  domaines = Object.values(Domaine);
  companyDomaine: any;
  zipCode: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private companyService: CompanyControllerService
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('id_user');
    this.role = localStorage.getItem('role') as string;
    this.token = localStorage.getItem('token') as string;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  save() {
    this.submitted = true;

    // Validation manuelle
    const formValid = !!this.companyName && 
                     !!this.companyDomaine && 
                     !!this.companyTelephone && 
                     !!this.companyEmail && 
                     !!this.zipCode && 
                     !!this.companyadress;

    if (!formValid) {
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const formDate = new FormData();
    
    formDate.append("logo", this.selectedFile);
    formDate.append("supervisorID", this.userId);
    formDate.append("companyName", this.companyName);
    formDate.append("address", this.companyadress);
    formDate.append("domaine", this.companyDomaine);
    formDate.append("website", this.companyWebSite);
    formDate.append("companyEmail", this.companyEmail);
    formDate.append("companyTel", this.companyTelephone);
    formDate.append("zipCode", this.zipCode);

    this.http.post(`${environment.apiUrl}/api/v1/company/Create`, formDate)
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Creation error:', err);
        }
      });
  }
}