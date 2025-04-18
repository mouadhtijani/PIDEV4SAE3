import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Domaine } from 'src/app/enums/domaine.enum';
import { InternshipType } from 'src/app/enums/internship-type.enum';
import { Company, InternshipResponse } from 'src/app/services/models';
import { environment } from 'src/environment.prod';

@Component({
  selector: 'app-internship-list',
  templateUrl: './internship-list.component.html',
  styleUrls: ['./internship-list.component.css']
})
export class InternshipListComponent implements OnInit {
onDomaineChange(event: any) {
  const selectElement = event.target as HTMLSelectElement;
  this.selectedDomaine = selectElement.value;
  this.loadAllInternshipByDomaine(this.status);
}
loadAllInternshipByDomaine(status:any) {
  this.http.get<InternshipResponse[]>(`${environment.apiUrl}/api/v1/internship/company/domaine/${this.selectedDomaine}`).subscribe(res => {
    this.internshipList = res.filter(internship => internship.internshipStatus === status );
    this.myinternshipList = res.filter(internship => internship.internshipStatus === status);
    this.internshipList.forEach((internship: { companyId: any; }) => {
      this.getCompany(internship.companyId);
      // Perform other processing with companyName as needed
    });
  
});
}

  status: string='';
  role: string ='';
  token: string ='';
  userId: any;
  userList: any;
  open: boolean = false;
  internshipList: any;
  myinternshipList: InternshipResponse[]=[];
search_text: any;
internshipTypes = Object.values(InternshipType);// Convert enum to array
selectedType:any;
allDomaine = Object.values(Domaine);// Convert enum to array
selectedDomaine:any;
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('id_user') ;
    this.role = localStorage.getItem('role') as string;
    this.token = localStorage.getItem('token') as string;

    // Subscribe to query parameter changes
    this.route.queryParams.subscribe(params => {
      this.status = params['status'];
      this.open = this.status === 'OPEN';
      this.loadInternshipList(this.status);
    });
  }
  onInternshipTypeChange(event: any) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedType = selectElement.value;
    this.loadInternshipByType(this.status,this.selectedType);
  }
  loadInternshipByType(status:any,selectedType: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.get<InternshipResponse[]>(`${environment.apiUrl}/api/v1/internship/internship-type/${selectedType}`).subscribe(res => {
        console.log(status,selectedType);
        this.internshipList = res.filter(internship => internship.internshipStatus === status && internship.internshipType === selectedType );
        this.myinternshipList = res.filter(internship => internship.internshipStatus === status && internship.internshipType ===selectedType);
        this.internshipList.forEach((internship: { companyId: any; }) => {
          this.getCompany(internship.companyId);
          // Perform other processing with companyName as needed
        });
      
    });
  }
  loadInternshipList(status: string): void {
    this.http.get<InternshipResponse[]>(`${environment.apiUrl}/api/v1/internship/internship-status/${status}`).subscribe(res => {
      if (status === 'OPEN') {
        this.internshipList = res.filter(internship => internship.internshipStatus === 'OPEN');
        this.myinternshipList = res.filter(internship => internship.internshipStatus === 'OPEN'  );
        this.internshipList.forEach((internship: { companyId: any; }) => {
          this.getCompany(internship.companyId);
          // Perform other processing with companyName as needed
        });
      } else {

this.internshipList = res.filter(internship => internship.internshipStatus === 'CLOSE');
        this.myinternshipList = res.filter(internship => internship.internshipStatus === 'CLOSE');
        this.internshipList.forEach((internship: { companyId: any; }) => {
          this.getCompany(internship.companyId);
          // Perform other processing with companyName as needed
        });   
         }
    });
  }
  companyName: {[key: number]: any} = {};
  getCompanyName(companyId: any): string {
    return this.companyName[companyId] ;
  }
  getCompany(companyId: any) {
    this.http.get<Company>(`${environment.apiUrl}/api/v1/company/${companyId}`).subscribe(res=>{
      this.companyName[companyId]=res.companyName;
    })
  }
}
