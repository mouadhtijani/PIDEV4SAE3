import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApplicationResponse, Company, InternshipResponse, User } from 'src/app/services/models';
import { environment } from 'src/environment.prod';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {
  nbrUSer:number=0;
  nbrInternship: number = 0;
  nbrApplication: number = 0;
  nbrCompany: number = 0;
  totalCompany: number = 0;
  totalStudent: number = 0;
  totalapplication: number = 0;
  listCompany: any;
  totalinternship: number = 0;
  totalInternship: any;
  internshipList: InternshipResponse[]=[];
  last10Students: any;

  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.loadAllCompany();
    this.loadAllApplication();
    this.loadAllInternship();
    this.loadAllStudent();
  }

  loadAllCompany() {

    this.http.get<Company[]>(`${environment.apiUrl}/api/v1/company`).subscribe(
      (res) => {
        this.totalCompany = res.length;
        this.listCompany=res;
        console.log('abababababbbabbabab:', this.totalCompany);

      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching internships:', error);
      }
    );
  }
  loadAllApplication() {

    this.http.get<ApplicationResponse[]>(`${environment.apiUrl}/api/v1/application`).subscribe(
      (res) => {
        this.totalapplication = res.length; // Assuming your API returns an array of Company objects
        console.log(' aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', this.totalapplication);


      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching internships:', error);
      }
    );
  }
  loadAllInternship() {

    this.http.get<InternshipResponse[]>(`${environment.apiUrl}/api/v1/internship`).subscribe(
      (res) => {
        this.totalInternship = res.length;
        this.internshipList=res; // Assuming your API returns an array of Company objects
        console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb:', this.totalInternship);

      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching internships:', error);
      }
    );
  }
  loadAllStudent() {

    this.http.get<User[]>(`${environment.apiUrl}/api/v1/user`).subscribe(
      (res) => {
        this.totalStudent = res.filter(user=>user.role==="STUDENT").length; // Assuming your API returns an array of Company objects
        this.last10Students = res.filter(user=>user.role==="STUDENT")
        .sort((a, b) => {
          if (a.creationDate && b.creationDate) {
            return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
          }
          return 0;
        })
        .slice(0, 10);
      console.log('cccccccccccccccccccccccc:', this.totalStudent);
      console.log('Last 5 Students:', this.last10Students);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching internships:', error);
      }
    );
  }


 
 
}
