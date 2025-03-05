import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddNewApplication$Params } from 'src/app/services/fn/application-controller/add-new-application';
import { ApplicationRequest } from 'src/app/services/models';
import { Internship } from 'src/app/services/models/internship';
import { ApplicationControllerService } from 'src/app/services/services';
import { environment } from 'src/environment.prod';

@Component({
  selector: 'app-top-hot-internship',
  templateUrl: './top-hot-internship.component.html',
  styleUrls: ['./top-hot-internship.component.css']
})
export class TopHotInternshipComponent implements OnInit  {
  myTop3Internship:Internship[]=[];
  userId:any;
  role:any;
  token:any;
  mylistInternship: any;
  isSupervisor:boolean=false;
  isNotConnected:boolean=false;
  isStudent:boolean=false;
  constructor( private http:HttpClient ,private router:Router ,private applicationService:ApplicationControllerService ){}
  ngOnInit(): void {
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
    this.load3MostInternship();
   }
   handleInternship(internshipId: number) {
    if(this.isNotConnected){
      this.router.navigate(['/login']);
    }
    if(this.isStudent){
      this.addApllication(internshipId)
    }
  }
  addApllication(internshipID: any) {

    const params:ApplicationRequest = {
     internshipId:internshipID as number,
     studentId:this.userId
   }
   const myparams : AddNewApplication$Params ={
     body:params
   }
   this.applicationService.addNewApplication(myparams,this.token).subscribe(res=>{
     console.log("success of applying for new internship ");
     this.ngOnInit();
   },err=>{
     (err.error);
   });
}
   load3MostInternship() {

    this.http.get<Internship[]>(`${environment.apiUrl}/api/v1/internship/top3MostApplied`).subscribe(res=>{
      this.myTop3Internship=res.slice(0,8);
      this.mylistInternship=this.myTop3Internship;
      this.mylistInternship.forEach((internship: { intershipId: any; }) => {
        console.log(internship.intershipId); // Console log each internshipId
        this.verifyUserApplication(internship.intershipId);
        // Perform other processing with companyName as needed
      });
      
      })
      }
      verifyUserApplication(internshipID: number) { 
        if (this.userId === '') {
          return;
        }
        console.log("ttttttttttttttttttttt",internshipID)
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      
        this.http.get(`${environment.apiUrl}/api/v1/application/verify/${this.userId}/${internshipID}`,{headers}).subscribe(res=>{
          this.applicationColors[internshipID] = res ?  'antiquewhite':'skyblue'  ;
      
        })  
      }
      applicationColors: {[key: number]: string} = {};
      getapplicationColor(myinternshipid: any): string {
      return this.applicationColors[myinternshipid] || 'limon';
    }
    isApplied(id_internship: any):boolean {
      let res= this.getapplicationColor(id_internship);
      if(this.role==='STUDENT'){
    
        if(res==='skyblue' ){
          return false;
        }
        else 
        return true;
      }
      return false;
      }
   
  }
