import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'app-application-status',
  templateUrl: './application-status.component.html',
  styleUrls: ['./application-status.component.css']
})
export class ApplicationStatusComponent implements OnInit {
  applications: any[] = [];
  searchStudentId: string = ''; // Stores input from search field

  constructor(private applicationService: ApplicationService) {}

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {
    this.applicationService.getApplications().subscribe(data => {
      this.applications = data;
    });
  }

  updateStatus(id: number, status: string) {
    this.applicationService.updateApplicationStatus(id, status).subscribe(() => {
      // Find the updated application and change its status in the UI
      const application = this.applications.find(app => app.applicationId === id);
      if (application) {
        application.status = status; // Update status locally
      }
    });
  }
  

  deleteApplication(id: number) {
    if (confirm('Are you sure you want to delete this application?')) {
      this.applicationService.deleteApplication(id).subscribe(() => {
        this.loadApplications(); // Refresh list after deletion
      });
    }
  }
  searchApplications() {
    if (this.searchStudentId.trim() === '') {
      this.loadApplications(); // Reload all if search field is empty
      return;
    }

    this.applicationService.searchApplications(this.searchStudentId).subscribe(data => {
      this.applications = data;
    });
  }
  
}
