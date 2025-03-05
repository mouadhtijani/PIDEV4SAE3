import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Internship } from 'src/app/services/models/internship';
import { environment } from 'src/environment.prod';
@Component({
  selector: 'app-top-hot-company',
  templateUrl: './top-hot-company.component.html',
  styleUrls: ['./top-hot-company.component.css']
})
export class TopHotCompanyComponent implements OnInit {
  Top3company: Internship[] = [];
  userId: any;
  role: any;
  token: any;
  myTop3Internship: Internship[] = [];

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.userId = localStorage.getItem('id_user');
    this.role = localStorage.getItem('role') as string;
    this.token = localStorage.getItem('token') as string;
    this.load3MostInternship();

  }
  load3MostInternship() {

    this.http.get<Internship[]>(`${environment.apiUrl}/api/v1/internship/top3MostApplied`).subscribe(res => {
      this.Top3company = res.slice(0, 4);
    })
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

}
