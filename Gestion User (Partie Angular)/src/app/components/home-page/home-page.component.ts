import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ApplicationRequest, ApplicationResponse, Company, InternshipResponse, User } from 'src/app/services/models';
import { Domaine } from 'src/app/enums/domaine.enum';
import { InternshipType } from 'src/app/enums/internship-type.enum';
import { Internship } from 'src/app/services/models/internship';
import { Feedback } from 'src/app/services/models/feedback';
import { Router } from '@angular/router';
import { AddNewApplication$Params } from 'src/app/services/fn/application-controller/add-new-application';
import { ApplicationControllerService } from 'src/app/services/services';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit,AfterViewInit  {
 
  mylistInternship: any;


  totalInternship: any;
  nbrInternship: number = 0;
  nbrApplication: number = 0;
  nbrCompany: number = 0;
  totalCompany: number = 0;
  totalStudent: number = 0;
  totalapplication: number = 0;
  totalinternship: number = 0;
  internshipTypes = Object.values(InternshipType);// Convert enum to array
  selectedType: any;
  listDomaine = Object.values(Domaine);// Convert enum to array
  selectedDomaine: any;
  userId: any;
  role: any;
  myTop3Internship:Internship[]=[];
  token: any;
  selectedCompany: any;
  listInternship: any;
  listCompany: any;
  companyNames: string[] = []; // Array to store list of company names
  search_text: any;
  start_date: any;
  nbrUSer:number=0;
  p: number =1;
  internshipList: InternshipResponse[]=[];
  allmydomaine: Map<Domaine, number>=new Map();
  last10Students: any;
  Top3company: Internship[]=[];
  listFeedback: Feedback[]=[];
  recentFeedback: Feedback[]=[];
  isNotConnected:boolean=false;
  isStudent:boolean=false;
  isSupervisor:boolean=false;
  constructor(private http: HttpClient,private el: ElementRef ,private router:Router ,private applicationService:ApplicationControllerService) { }
  ngOnInit(): void {

    
    this.userId = localStorage.getItem('id_user');
    this.role = localStorage.getItem('role') as string;
    this.token = localStorage.getItem('token') as string;
    //this.getInternshipByDomaine();
  //  this.load3MostInternship();
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

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const divAElements = this.el.nativeElement.querySelectorAll('.divA');
          divAElements.forEach((element: HTMLElement) => {
            element.classList.add('visible');
          });
          const feedbackElements = this.el.nativeElement.querySelectorAll('.oneFeedbackcontainer');
          feedbackElements.forEach((element: HTMLElement) => {
            element.classList.add('visible');
          });
          observer.disconnect(); 
        }
      });
    });

    observer.observe(this.el.nativeElement.querySelector('.stats'));
    observer.observe(this.el.nativeElement.querySelector('.feedbackcontainer'));
  }



 



 
 
 
 



}