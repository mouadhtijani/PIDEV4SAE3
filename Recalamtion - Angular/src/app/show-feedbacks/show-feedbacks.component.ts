import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService, Feedback } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-show-feedbacks',
  templateUrl: './show-feedbacks.component.html',
  styleUrls: ['./show-feedbacks.component.css']
})
export class ShowFeedbacksComponent implements OnInit {
  internshipId!: number;
  feedbacks: Feedback[] = [];

  constructor(
    private route: ActivatedRoute,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    // Extract the internship ID from the URL
    this.internshipId = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch feedback for this internship
    this.feedbackService.getFeedbackByInternship(this.internshipId).subscribe(
      (data) => {
        console.log("Feedback received:", data);
        this.feedbacks = data;
      },
      (error) => console.error("Error fetching feedback", error)
    );
  }
  calculateAverageRating(): number {
    if (this.feedbacks.length === 0) return 0; // Avoid division by zero
    const total = this.feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
    return total / this.feedbacks.length; // Calculate the average
  }
  
}
