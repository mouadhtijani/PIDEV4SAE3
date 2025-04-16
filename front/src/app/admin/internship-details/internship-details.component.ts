import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddNewApplication$Params } from 'src/app/services/fn/application-controller/add-new-application';
import { ApplicationRequest, ApplicationResponse } from 'src/app/services/models';
import { Internship } from 'src/app/services/models/internship';
import { ApplicationControllerService } from 'src/app/services/services';
import { environment } from 'src/environment.prod';

@Component({
  selector: 'app-internship-details',
  templateUrl: './internship-details.component.html',
  styleUrls: ['./internship-details.component.css']
})
export class InternshipDetailsComponent {
  goToStudentDetails(userID: any) {
    this.router.navigate([`/admin/dashboard/all-user/${userID}`]);
  }
  

  internshipID: any;
  myInternship: Internship | undefined;
  nbrApp: number=0;
  userId:any;
  role:any;
  token:any;
  isStudent:boolean=false;
  isApplied:boolean=false;
  myApplication:ApplicationResponse={};
  pendingApplication:any;
  p:number=1;
  AllApplicationRequest:ApplicationResponse[]=[];
  acceptedApplications: ApplicationResponse[] = [];
  refusedApplications: ApplicationResponse[] = [];
  myCondidateList: ApplicationResponse[]=[];
  constructor(private applicationService:ApplicationControllerService, private route:ActivatedRoute ,private router:Router,private http:HttpClient ){}
  ngOnInit(): void {
    this.internshipID = this.route.snapshot.paramMap.get('id-internship') ;
    this.userId = localStorage.getItem('id_user');
    this.role = localStorage.getItem('role') as string;
    this.token = localStorage.getItem('token') as string;
    this.loadOneInternship();
    this.loadNbrApplication();
    this.verifyUserApplication(this.internshipID);
    if(this.role==="STUDENT"){
      this.isStudent=true;
    }
    this.loadApplicationByInternship(this.internshipID);


  }
  loadAllApplication(status: string) {
    if(status==='accepted'){
      this.myCondidateList=this.acceptedApplications;
    }else if (status==='all'){
      this.loadApplicationByInternship(this.internshipID);
    }
    else if (status==='pending'){
      this.myCondidateList=this.pendingApplication;
    }
    else{
      this.myCondidateList=this.refusedApplications;
  
    }
  }
  loadApplicationByInternship(applicationId: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    this.http.get<ApplicationResponse[]>(`${environment.apiUrl}/api/v1/application/internship/${applicationId}`,{headers}).subscribe(res=>{
     this.AllApplicationRequest=res;
      this.myCondidateList=res;
      console.log(this.myCondidateList);
      this.pendingApplication = res.filter(application => application.applicationStatus === 'PENDING');
      this.acceptedApplications = res.filter(application => application.applicationStatus === 'ACCEPTED');
      this.refusedApplications = res.filter(application => application.applicationStatus === 'REFUSED');

  }) 
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
  loadNbrApplication() {
    this.http.get<ApplicationResponse[]>(`${environment.apiUrl}/api/v1/application/internship/${this.internshipID}`).subscribe(res=>{
      this.nbrApp=res.length;
  }) 
 }
  loadOneInternship() {
    this.http.get<Internship>(`${environment.apiUrl}/api/v1/internship/${this.internshipID}`).subscribe(res=>{
        this.myInternship=res as Internship ;
    })  }
    addApplication() {
        if(this.userId===''){
          this.router.navigate(['/login']);
        }else{
          const params:ApplicationRequest = {
            internshipId:this.myInternship?.intershipId as number,
            studentId:this.userId
          }
          const myparams : AddNewApplication$Params ={
            body:params
          }
          this.applicationService.addNewApplication(myparams,this.token).subscribe(res=>{
            console.log("success of applying for new internship ");
            this.router.navigate(['/homepage']);
          },err=>{
            console.log(err.error);
          });
        }
    }
    verifyUserApplication(internshipID: number) { 
      if (this.userId === '') {
        return;
      }
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    
      this.http.get(`${environment.apiUrl}/api/v1/application/verify/${this.userId}/${internshipID}`,{headers}).subscribe(res=>{
          this.isApplied=res as boolean;
          if(this.isApplied){
            this.loadStudentApplication(this.userId ,internshipID );
          }
        console.log(this.isApplied);
      })
       // console.log(internshipID);
    
    
    }
  loadStudentApplication(userId: any,internshipID:any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      console.log("aaaaaaaaaaaaaaaaa",internshipID)
      this.http.get<ApplicationResponse>(`${environment.apiUrl}/api/v1/application/get-one/${userId}/${internshipID}`,{headers}).subscribe(res=>{
          this.myApplication=res;
          console.log(this.myApplication);
      })
  }
}

