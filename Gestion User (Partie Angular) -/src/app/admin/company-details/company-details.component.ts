import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SetCompany$Params } from 'src/app/services/fn/company-controller/set-company';
import { SetCompanyStatus$Params } from 'src/app/services/fn/company-controller/set-company-status';
import { Company } from 'src/app/services/models';
import { CompanyControllerService } from 'src/app/services/services';
import { environment } from 'src/environment.prod';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  myid_company:  any;
  userId: any;
  role: any;
  token: any;
  myCompany: Company={};
  pending:boolean=false;
  constructor(private route:ActivatedRoute , private companyService:CompanyControllerService , private http:HttpClient){}
  ngOnInit(): void {
    this.userId = localStorage.getItem('id_user');
    this.role = localStorage.getItem('role') as string ;
    this.token = localStorage.getItem('token') as string; 
    this.route.paramMap.subscribe(params => {
      this.myid_company = params.get('id-company');
    console.log(this.myid_company);
  });
    this.route.queryParamMap.subscribe(params => {
    this.pending = params.get('pending') === 'true'; // Convert string to boolean
  });
    this.loadCompanyData(this.myid_company);

  }
  loadCompanyData(id_company: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    this.http.get<Company>(`${environment.apiUrl}/api/v1/company/${id_company}`,{headers}).subscribe(res=>{
      this.myCompany=res;
    })
  }

  setCompanyStatus(newStatus: string) {
    let params:SetCompanyStatus$Params={id_company:0,newStatus:'PENDING'};
    if(newStatus==='Accepted'){
       params={id_company:this.myid_company ,newStatus:'ACCEPTED'}
      this.companyService.setCompanyStatus(params,this.token).subscribe(res=>{
        console.log("updated successfully");
      })
    }
    else{
      params={id_company:this.myid_company ,newStatus:'REFUSED'}
      this.companyService.setCompanyStatus(params,this.token).subscribe(res=>{
        console.log("updated successfully");
      })
    }
    }
}
