import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReclamationService, Reclamation } from '../services/reclamation.service';
import { ResponseService } from '../services/response.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reclamation-response',
  templateUrl: './reclamation-response.component.html',
  styleUrls: ['./reclamation-response.component.css']
})
export class ReclamationResponseComponent implements OnInit {
  reclamation!: Reclamation;
  responseMessage: string = ''; // Admin's response message
  isEditing = false; // Flag to toggle between view and edit modes

  constructor(
    private route: ActivatedRoute, // To get the 'id' of the reclamation from URL
    private reclamationService: ReclamationService, // Service to interact with reclamations
    private responseService: ResponseService, // Service to handle response creation
    private toastr: ToastrService // To show success and error notifications
  ) {}

  ngOnInit(): void {
    const reclamationId = Number(this.route.snapshot.paramMap.get('id')); // Extract the 'id' parameter from the URL
    if (reclamationId) {
      this.loadReclamation(reclamationId); // Load the reclamation data
    }
  }

  loadReclamation(id: number): void {
    // Get the reclamation data by id
    this.reclamationService.getById(id).subscribe({
      next: (data) => {
        this.reclamation = data; // Set the reclamation data
        if (data.response) {
          this.responseMessage = data.response.message; // Set existing response message if available
        }
      },
      error: () => {
        this.toastr.error('Failed to load reclamation');
      }
    });
  }

  enableEdit(): void {
    this.isEditing = true; // Toggle to edit mode
  }

  cancelEdit(): void {
    this.isEditing = false; // Cancel edit mode
    if (this.reclamation.response) {
      this.responseMessage = this.reclamation.response.message; // Restore the original response message
    }
  }

  submitResponse(): void {
    if (!this.responseMessage.trim()) {
      this.toastr.warning('Please provide a response message');
      return;
    }

    // Create or update the response for the reclamation
    this.responseService.createResponse(this.reclamation.id!, this.responseMessage).subscribe({
      next: () => {
        this.toastr.success('Response sent successfully');
        this.reclamation.response = { message: this.responseMessage, responseDate: new Date().toISOString() }; // Set the new response
        this.isEditing = false; // Exit edit mode
      },
      error: () => {
        this.toastr.error('Failed to send response');
      }
    });
  }
}
