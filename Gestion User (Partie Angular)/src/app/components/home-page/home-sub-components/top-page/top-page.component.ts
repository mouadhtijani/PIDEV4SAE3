import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InternshipType } from 'src/app/enums/internship-type.enum';
import { Company, InternshipResponse } from 'src/app/services/models';
import { ApplicationControllerService } from 'src/app/services/services';
import { environment } from 'src/environment.prod';

@Component({
  selector: 'app-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.css']
})
export class TopPageComponent implements OnInit {
  isNotConnected:boolean=false;
  isStudent:boolean=false;
  isSupervisor:boolean=false;
  userId: any;
  role: any;
  token: any;
  totalInternship: any;
  internshipList: InternshipResponse[]=[];
  selectedType: any;
  listInternship: any;
  internshipTypes = Object.values(InternshipType);// Convert enum to array
  search_text: any;
  companyNames: string[] = []; // Array to store list of company names
  selectedCompany: any;
  start_date: any; 
  p: number =1;
  listCompany: any;


  constructor(private http: HttpClient,private el: ElementRef ,private router:Router ,private applicationService:ApplicationControllerService) { }
  ngOnInit(): void {
  
    this.loadAllInternship();
    this.loadAllCompany();
    this.userId = localStorage.getItem('id_user');
    this.role = localStorage.getItem('role') as string;
    this.token = localStorage.getItem('token') as string;
   
    if(this.userId===''){
      this.isNotConnected=true;
    }
    if(this.role==='STUDENT'){
      this.isStudent=true;
    }
    if(this.role==='SUPERVISOR'){
      this.isSupervisor=true;
    }
  }
  loadAllCompany() {

    this.http.get<Company[]>(`${environment.apiUrl}/api/v1/company`).subscribe(
      (res) => {
        this.listCompany=res;
        this.extractCompanyNames();

      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching internships:', error);
      }
    );
  }
  extractCompanyNames() {
    this.listCompany.forEach((company: { companyName: any; }) => {
      this.companyNames.push(company.companyName);
      // Perform other processing with companyName as needed
    });
  }
  loadAllInternship() {

    this.http.get<InternshipResponse[]>(`${environment.apiUrl}/api/v1/internship`).subscribe(
      (res) => {
        this.totalInternship = res.length;
        this.internshipList=res; // Assuming your API returns an array of Company objects
        console.log('nbrInternship Name:', this.internshipList);

      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching internships:', error);
      }
    );
  }
  onInternshipTypeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedType = selectElement.value;
    this.loadInternshipByType(this.selectedType);

  }
  loadInternshipByType(selectedType: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.get<InternshipResponse[]>(`${environment.apiUrl}/api/v1/internship/internship-type/${selectedType}`).subscribe(
      (res) => {
        this.internshipList = res;

        console.log('List of Internships:', this.listInternship);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching internships:', error);
      }
    );
  }
  onCompanyNameChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCompany = selectElement.value;
    this.loadInternshipByCompanyName(this.selectedCompany);
  }
  loadInternshipByCompanyName(selectedCompany: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    this.http.get<InternshipResponse[]>(`${environment.apiUrl}/api/v1/internship/company/name/${selectedCompany}`).subscribe(
      (res) => {
        this.internshipList = res;
        console.log('List of Internships:', this.listInternship);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching internships:', error);
      }
    );
  }
  onDateChange(event: Event) {
    this.loadAllInternshipAfterDate();
  }
  loadAllInternshipAfterDate() {
    console.log("mydate", this.start_date);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.get<InternshipResponse[]>(`${environment.apiUrl}/api/v1/internship/date-after/${this.start_date}`).subscribe(
      (res) => {
        this.internshipList = res;

        console.log('List of Internships:', this.listInternship);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching internships:', error);
      }
    );
  }
  getRecentsInternship() {

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.get<InternshipResponse[]>(`${environment.apiUrl}/api/v1/internship/ordred`).subscribe(
      (res) => {
        this.internshipList = res;

        console.log('List of Internships:', this.listInternship);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching internships:', error);
      }
    );
  }
}
