import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Domaine } from 'src/app/enums/domaine.enum';
import { SetCompanyStatus$Params } from 'src/app/services/fn/company-controller/set-company-status';
import { Company } from 'src/app/services/models';
import { CompanyControllerService } from 'src/app/services/services';
import { environment } from 'src/environment.prod';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
setCompanyNewStatus(mynewStatus: string,companyId:any) {
  let params:SetCompanyStatus$Params={id_company:0,newStatus:'PENDING'};
  if(mynewStatus==='ACCEPTED'){
     params={id_company:companyId ,newStatus:'ACCEPTED'}
    this.companyService.setCompanyStatus(params,this.token).subscribe(res=>{
      console.log("updated successfully");
      this.router.navigate(['/admin/dashboard/all-company'], { queryParams: { status: 'ACCEPTED' } });
    })
  }
  if(mynewStatus==='REFUSED'){
    params={id_company:companyId ,newStatus:'REFUSED'}
   this.companyService.setCompanyStatus(params,this.token).subscribe(res=>{
     console.log("updated successfully");
     this.router.navigate(['/admin/dashboard/all-company'], { queryParams: { status: 'ACCEPTED' } });
   })
 }
}
  listCompany: Company[] = [];
  status: string='';
  userId:any;
  role:any;
  token:any;
search_text: any;
allDomaine = Object.values(Domaine);// Convert enum to array
selectedDomaine:any;
  constructor(private route: ActivatedRoute,private router:Router, private companyService: CompanyControllerService, private http: HttpClient) {}
  onDomaineChange(event: any) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedDomaine = selectElement.value;
    this.loadAllCompanyByDomaine(this.status);
  }
  loadAllCompanyByDomaine(status: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.get<Company[]>(`${environment.apiUrl}/api/v1/company/domaine/${this.selectedDomaine}`,{headers}).subscribe(res=>{
      this.listCompany = res.filter(company => company.companyStatus === status);
      console.log("list",this.listCompany);
      console.log("status",status);
      console.log(this.selectedDomaine);
    })

  }
  
  ngOnInit(): void {
    this.userId = localStorage.getItem('id_user');
    this.role = localStorage.getItem('role') as string;
    this.token = localStorage.getItem('token') as string;
    // Subscribe to query parameter changes
    this.route.queryParams.subscribe(params => {
      this.status = params['status'];
      this.loadAllCompany(this.status);
    });
  }

  loadAllCompany(status: string): void {
    this.http.get<Company[]>(`${environment.apiUrl}/api/v1/company`).subscribe(res => {
      if (status === 'PENDING') {
        this.listCompany = res.filter(company => company.companyStatus === "PENDING");
      } else {
        this.listCompany = res.filter(company => company.companyStatus === "ACCEPTED");
      }
      console.log("Company List:", this.listCompany);
    });
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
