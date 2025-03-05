import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/models';
import { environment } from 'src/environment.prod';
@Component({
  selector: 'app-newest-member',
  templateUrl: './newest-member.component.html',
  styleUrls: ['./newest-member.component.css']
})
export class NewestMemberComponent implements OnInit {
  userId: any;
  role: any;
  token: any;
  last10Students: any;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.userId = localStorage.getItem('id_user');
    this.role = localStorage.getItem('role') as string;
    this.token = localStorage.getItem('token') as string;
    this.loadAllStudent()  ;
  } 
  loadAllStudent() {

    this.http.get<User[]>(`${environment.apiUrl}/api/v1/user`).subscribe(
      (res) => {
        this.last10Students = res.filter(user=>user.role==="STUDENT")
        .sort((a, b) => {
          if (a.creationDate && b.creationDate) {
            return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
          }
          return 0;
        })
        .slice(0, 10);
      console.log('Last 5 Students:', this.last10Students);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching internships:', error);
      }
    );
  }
}
