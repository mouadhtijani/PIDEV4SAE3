import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Classe } from 'src/app/enums/classe.enum';
import { Domaine } from 'src/app/enums/domaine.enum';
import { Level } from 'src/app/enums/level.enum';
import { Speciality } from 'src/app/enums/speciality.enum';
import { Company, User } from 'src/app/services/models';
import { environment } from 'src/environment.prod';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  status: any;
  role: any;
  token: any;
  userId: any;
  userList: any;
  isStudent: boolean = false;
  currentStatus: string = '';

  listSpeciality = Object.values(Speciality); // Convert enum to array
  selectedSpeciality: any;
  listClasse = Object.values(Classe); // Convert enum to array
  selectedClasse: any;
  listLevel = Object.values(Level); // Convert enum to array
  selectedLevel: any;
  allDomaine = Object.values(Domaine);// Convert enum to array
  selectedDomaine:any;
search_text: any;
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('id_user');
    this.role = localStorage.getItem('role') as string;
    this.token = localStorage.getItem('token') as string;

    // Subscribe to query parameter changes
    this.route.queryParams.subscribe(params => {
      this.status = params['status'];
      if (this.currentStatus !== this.status) {
        this.currentStatus = this.status;
        this.loadAllUser(this.status);
      }
      this.isStudent = this.status === 'STUDENT';
    });
  }

 
  onSpecialityChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedSpeciality = selectElement.value;
    this.getAllStudentBySpecialty(this.selectedSpeciality);
  }

  onLevelChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedLevel = selectElement.value;
    this.getAllStudentByLevel(this.selectedLevel);
  }

  onClasseChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedClasse = selectElement.value;
    this.getAllStudentByClasse(this.selectedClasse);
  }

  getAllStudentBySpecialty(selectedSpeciality: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.get<Company>(`${environment.apiUrl}/api/v1/user/speciality/${selectedSpeciality}`, { headers }).subscribe(res => {
      this.userList = res;
    });
  }

  getAllStudentByLevel(selectedLevel: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.get<Company>(`${environment.apiUrl}/api/v1/user/student-level/${selectedLevel}`, { headers }).subscribe(res => {
      this.userList = res;
    });
  }

  getAllStudentByClasse(selectedClasse: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.get<Company>(`${environment.apiUrl}/api/v1/user/classe-level/${selectedClasse}`, { headers }).subscribe(res => {
      this.userList = res;
    });
  }

  loadAllUser(status: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.get<User[]>(`${environment.apiUrl}/api/v1/user/role/${status}`, { headers }).subscribe(res => {
      this.userList = res;
      if (status === 'STUDENT') {
        this.userList = res.filter(user => user.role === 'STUDENT');
      } else {
        this.userList = res.filter(user => user.role === 'SUPERVISOR');
        this.userList.forEach((user: { userId: any; }) => {
          this.getCompany(user.userId);
        });
      }
    });
  }

  listCompany: { [key: number]: any } = {};

  getCompany(userId: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.get<Company>(`${environment.apiUrl}/api/v1/company/user/${userId}`, { headers }).subscribe(res => {
      this.listCompany[userId] = res;
    });
  }

  getUserCompany(userId: any): Company | undefined {
    return this.listCompany[userId] as Company;
  }
}
