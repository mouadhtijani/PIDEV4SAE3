import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationResponse, Company, InternshipResponse, User } from 'src/app/services/models';
import { Internship } from 'src/app/services/models/internship';
import { environment } from 'src/environment.prod';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent  implements OnInit{
  goToInternshipDetails(internship: any) {
    console.log('salim',internship.internshipId);
    this.router.navigate([`/admin/dashboard/all-internship/${internship.internshipId}`]);
  }
  goToInternshippDetails(internshipId: any) {
    this.router.navigate([`/admin/dashboard/all-internship/${internshipId}`]);
  }
  myAllInternship:any;
  userID:any;
  userId:any;
  role:any;
  token:any;
  student:boolean=false;
  myUser: User={};
  myCompany: Company={};
  myApplication: any;
  listOfApplication: ApplicationResponse[]=[];
  myInternship: Internship[]=[];
  p: number=1;
  varInternship: any;
  constructor(private route:ActivatedRoute,private router:Router,private http:HttpClient){}
  ngOnInit(): void {
    this.userId = localStorage.getItem('id_user');
    this.role = localStorage.getItem('role') as string ;
    this.token = localStorage.getItem('token') as string; 
    this.route.paramMap.subscribe(params => {
      this.userID = params.get('id-user');
    console.log(this.userID);
  });
  this.route.queryParamMap.subscribe(params => {
    this.student = params.get('student') === 'true'; 
  });
  this.loadUserData(this.userID);
  if(this.student==true){
    this.loadStudentApplication(this.userID);
  }else{
    this.loadSupervisorCompany(this.userID);
  }
  }
  loadSupervisorCompany(userID: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    this.http.get<Company>(`${environment.apiUrl}/api/v1/company/user/${userID}`,{headers}).subscribe(res=>{
      this.myCompany=res;
      this.loadSuperVisorInternship(userID);

    }) ;  }
  loadSuperVisorInternship(userID: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    this.http.get<Internship[]>(`${environment.apiUrl}/api/v1/internship/supervisor/${userID}`,{headers}).subscribe(res=>{
      this.myInternship=res ;
      this.myAllInternship.forEach((internship: { internshipId: any; }) => {
        this.getInternship(internship.internshipId);
        // Perform other processing with companyName as needed
      });
      console.log("liste of internship",res);
      console.log("liste des image ",res.filter(internship=>internship.company.company_logo));

    }) ;  }
  loadStudentApplication(userID: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    this.http.get<ApplicationResponse[]>(`${environment.apiUrl}/api/v1/application/user/${userID}`,{headers}).subscribe(res=>{
      this.myApplication=res;
      this.listOfApplication=res;
      this.myApplication.forEach((application: { internshipId: any; }) => {
        this.getInternship(application.internshipId);
        // Perform other processing with companyName as needed
      });
          console.log("liste of application",res);
    }) ;
    }
    ListInternship: {[key: number]: Internship} = {};
    getCompanyImage(internshipid: any): any {
      const internship = this.ListInternship[internshipid];
      if (!internship) {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        return ''; // or handle the case where internship is undefined
      }
      console.log("bbbbbbbbbbbbbbbbbbbbbb");
      console.log(internship.company.company_logo);
      return internship.company.company_logo;
    }
   
    getOneInternship(internshipId: any): any {
      const internship = this.ListInternship[internshipId];
      if (!internship) {
        return ''; // or handle the case where internship is undefined
      }
      return internship;   
     }
     base64ToArrayBuffer(base64: string) {
      const binaryString = window.atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
    }
    openStudentCV(cvData: any) {
      if (cvData) {
        const byteArray = this.base64ToArrayBuffer(cvData);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      } else {
        console.error('No CV data available');
      }
    }
    goToCompanyWeb(webSite: string | undefined) {
      if (webSite) {
        // Ensure the URL starts with 'http://' or 'https://'
        if (!/^https?:\/\//i.test(webSite)) {
          webSite = 'http://' + webSite;
        }
        window.open(webSite, '_blank');
      } else {
        console.error('Website URL is undefined');
      }
    }
  getInternship(internshipId: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    this.http.get<Internship>(`${environment.apiUrl}/api/v1/internship/${internshipId}`,{headers}).subscribe(res=>{
      this.varInternship=res;
      this.ListInternship[internshipId]=res as Internship;
      console.log("this is a new internship ",res);
    }) ;
  }
  loadUserData(userID: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

this.http.get<User>(`${environment.apiUrl}/api/v1/user/${userID}`,{headers}).subscribe(res=>{
  this.myUser=res;
}) ;
 }

}
