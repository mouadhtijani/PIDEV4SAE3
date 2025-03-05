import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.css']
})
export class LeftSideBarComponent implements OnInit {

  showCompanyOptions: boolean = false;
  showInternshipOptions: boolean = false;
  showApplicationOptions: boolean = false;
  showUserOptions:boolean=false;
  constructor(private router:Router){}
  ngOnInit(): void {
    
  }

  getAllSupervisor() {
    this.router.navigate(['/admin/dashboard/all-user'], { queryParams: { status: 'SUPERVISOR' } });
  }
    getAllStudent() {
      this.router.navigate(['/admin/dashboard/all-user'], { queryParams: { status: 'STUDENT' } });
    }
    getAllClosedInternship() {
      this.router.navigate(['/admin/dashboard/all-internship'], { queryParams: { status: 'CLOSE' } });
    }
    getAllOpenInternship() {
      this.router.navigate(['/admin/dashboard/all-internship'], { queryParams: { status: 'OPEN' } });
    }
    getAllCreatedCompany() {
      this.router.navigate(['/admin/dashboard/all-company'], { queryParams: { status: 'ACCEPTED' } });
    }
    getAllNewCompanyRequest() {
      this.router.navigate(['/admin/dashboard/all-company'], { queryParams: { status: 'PENDING' } });
    }
    getAllAcceptedApplication() {
      this.router.navigate(['/admin/dashboard/all-application'], { queryParams: { status: 'ACCEPTED' } });
      }
      getAllPendingApplication() {
        this.router.navigate(['/admin/dashboard/all-application'], { queryParams: { status: 'PENDING' } });
      }

}
