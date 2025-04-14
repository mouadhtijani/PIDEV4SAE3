import { Component, OnInit } from '@angular/core';
import { InternshipService, Internship } from 'src/app/services/internship.service';
import { FeedbackService, Feedback } from 'src/app/services/feedback.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-internship-list',
  templateUrl: './internship-list.component.html',
  styleUrls: ['./internship-list.component.css']
})
export class InternshipListComponent implements OnInit {
  internships: Internship[] = [];
  ratings: { [key: number]: number } = {}; // Store average ratings for internships
  feedbackLoadedCount = 0; // Track how many feedback loads are completed
  isReclamationFormVisible: boolean = false;


  constructor(
    private internshipService: InternshipService,
    private feedbackService: FeedbackService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.internshipService.getInternships().subscribe(
      (data) => {
        console.log('Internship data:', data);
        this.internships = data;
        if (this.internships.length === 0) return;

        // Load feedback for each internship
        this.internships.forEach(internship => this.loadFeedback(internship.internshipId));
      },
      (error) => console.error('Error fetching internships', error)
    );
  }

  apply(internshipId: number) {
    this.router.navigate(['/apply', internshipId]);
  }

  showFeedbacks(internshipId: number) {  
    this.router.navigate(['/show-feedbacks', internshipId]);  
  }

  loadFeedback(internshipId: number) {
    this.feedbackService.getFeedbackByInternship(internshipId).subscribe(
      (feedbacks: Feedback[]) => {
        this.ratings[internshipId] = this.calculateAverageRating(feedbacks);

        // Check if all feedbacks have been loaded before sorting
        this.feedbackLoadedCount++;
        if (this.feedbackLoadedCount === this.internships.length) {
          this.sortInternshipsByRating();
        }
      },
      (error) => console.error(`Error fetching feedbacks for internship ${internshipId}`, error)
    );
  }

  calculateAverageRating(feedbacks: Feedback[]): number {
    if (feedbacks.length === 0) return 0;
    const total = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
    return total / feedbacks.length;
  }

  sortInternshipsByRating() {
    this.internships.sort((a, b) => (this.ratings[b.internshipId] || 0) - (this.ratings[a.internshipId] || 0));
  }
}
