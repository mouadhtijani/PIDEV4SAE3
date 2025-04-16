import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { User } from 'src/app/services/models';
import { environment } from 'src/environment.prod';
@Component({
  selector: 'app-user-statstic',
  templateUrl: './user-statstic.component.html',
  styleUrls: ['./user-statstic.component.css']
})
export class UserStatsticComponent implements OnInit {
 userId: any;
  role: any;
  token: any;
  userList: User[]=[];
  nbrStudent: number =0;
  nbrSupervisor: number =0;
  studentList: User[]=[];
  myData : any[] = [];
  myLevelData : any[] = [];
  mySpecialityData : any[] = [];
  pieChart: any;
  barChart2: any;
  barChart: any;
  nbrLicence: number =0;
  nbrMaster: number =0;
  nbrEngineer: number =0;
  nbrArctic:  number =0;
  nbrBi:  number =0;
  nbrGaming:  number =0;
  nbDs:  number =0;
  nbrTwin:  number =0;
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

 ngOnInit(): void {
    this.userId = localStorage.getItem('id_user');
    this.role = localStorage.getItem('role') as string;
    this.token = localStorage.getItem('token') as string;
        this.loadAllUser();
     
  }
  loadAllUser() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.get<User[]>(`${environment.apiUrl}/api/v1/user`, { headers }).subscribe(res => {
      this.userList = res;
      this.studentList=res.filter(user => user.role === 'STUDENT');
        this.nbrStudent = res.filter(user => user.role === 'STUDENT').length;
        this.nbrSupervisor = res.filter(user => user.role === 'SUPERVISOR').length;   
        this.nbrLicence=res.filter(user => user.studentLevel ==='LICENCE').length;
        this.nbrMaster=res.filter(user => user.studentLevel ==='MASTER').length;
        this.nbrEngineer=res.filter(user => user.studentLevel ==='ENGINEER' ).length;

        this.nbrArctic=res.filter(user => user.specialty ==='ARCTIC').length;
        this.nbrBi=res.filter(user => user.specialty ==='BI').length;
        this.nbrGaming=res.filter(user => user.specialty ==='GAMING' ).length;
        this.nbDs=res.filter(user => user.specialty ==='DS').length;
        this.nbrTwin=res.filter(user => user.specialty ==='TWIN').length;
        this.myData.push(this.nbrStudent);
        this.myData.push(this.nbrSupervisor); 
        this.myLevelData.push(this.nbrLicence);
        this.myLevelData.push(this.nbrMaster);
        this.myLevelData.push(this.nbrEngineer);
        this.mySpecialityData.push(this.nbrArctic);
        this.mySpecialityData.push(this.nbrBi);
        this.mySpecialityData.push(this.nbDs);
        this.mySpecialityData.push(this.nbrTwin);
        this.mySpecialityData.push(this.nbrGaming);



        this.generatePieChart(this.myData);
        this.generateBarChart(this.myLevelData);
        this.generateBarChart2(this.mySpecialityData)

    });
  }
  generateBarChart2(mySpecialityData:any):void {
    const canvas = document.getElementById('barChart2') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      this.barChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Arcitc', 'BI', 'DS','TWIN','GAMING'],
          datasets: [{
            data: mySpecialityData,
            backgroundColor: ['lightsteelblue','red' ,'yellow', 'lightskyblue', 'lightgoldenrodyellow']
          }]
        }
      });
    } else {
      console.error('Canvas context is null.');
    }  }
  generateBarChart(myLevelData: any):void {
    const canvas = document.getElementById('barChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      this.barChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Licence', 'Master', 'Engineer'],
          datasets: [{
            data: myLevelData,
            backgroundColor: ['lightsteelblue', 'lightskyblue', 'lightgoldenrodyellow']
          }]
        }
      });
    } else {
      console.error('Canvas context is null.');
    }
  }
  generatePieChart(myData:any): void {
    const canvas = document.getElementById('pieChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      this.pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Student', 'Supervsior', ],
          datasets: [{
            data: myData,
            backgroundColor: ['lightblue', 'lightskyblue']
          }]
        }
      });
    } else {
      console.error('Canvas context is null.');
    }
  }


}
