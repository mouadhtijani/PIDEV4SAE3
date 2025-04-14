import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css']
})
export class AddFeedbackComponent {
  internshipId: number;
  feedback = { rating: 0, comment: '' };

  constructor(
    private route: ActivatedRoute,
    private feedbackService: FeedbackService,
    private router: Router
  ) {
    this.internshipId = Number(this.route.snapshot.paramMap.get('id'));
  }

  rate(value: number) {
    this.feedback.rating = value;
  }

  submitFeedback() {
    if (!this.feedback.comment.trim()) {
      alert('Please add a comment.');
      return;
    }

    const newFeedback = { ...this.feedback, internshipId: this.internshipId };

    this.feedbackService.addFeedback(newFeedback).subscribe(() => {
      alert('Feedback submitted successfully!');
      this.router.navigate(['/internships']);
    });
  }
}
