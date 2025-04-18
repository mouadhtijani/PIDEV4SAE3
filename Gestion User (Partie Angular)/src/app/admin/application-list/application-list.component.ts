import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationResponse } from 'src/app/services/models';
import { environment } from 'src/environment.prod';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {
  status: any;
  role: any;
  token: any;
  userId: any;
  userList:any;
  open:boolean=false;
  applicationList:ApplicationResponse[]=[];
  constructor ( private route: ActivatedRoute ,private http:HttpClient ){}
  ngOnInit(): void {
    this.userId= localStorage.getItem('id_user');
    this.role= localStorage.getItem('role') as string;
    this.token=localStorage.getItem('token') as string;
    this.status = this.route.snapshot.queryParams['status'];
    if(this.status==='ACCEPTED'){
      this.open=true;
    }
    this.loadInternshipList(this.status);

  }
  loadInternshipList(status: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    this.http.get<ApplicationResponse[]>(`${environment.apiUrl}/api/v1/application/status/${status}`,{headers}).subscribe(res=>{
      this.applicationList=res;
      console.log(status,res);
    })
  }
}
