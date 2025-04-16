import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FeedbackRequest } from 'src/app/services/models/feedback-request';
import { environment } from 'src/environment.prod';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  userId:any;
  role:any;
  feedback_description: any;
  token:any;
  constructor(private http:HttpClient){}
ngOnInit(): void {
  this.userId = localStorage.getItem('id_user');
  this.role = localStorage.getItem('role') as string;
  this.token = localStorage.getItem('token') as string; 
}

  
sendFeedback() {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  const params:FeedbackRequest={
    description:this.feedback_description,
    userID:this.userId
  }
  this.http.post(`${environment.apiUrl}/api/v1/feedback/Create`,params,{headers}).subscribe(res=>{
    console.log("created");
    this.feedback_description=null;
  })
}

}
