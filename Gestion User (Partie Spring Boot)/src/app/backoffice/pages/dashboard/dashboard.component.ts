import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  communityId: number = 1; // Example communityId, replace with the actual community ID
  numberOfThreads: number = 0;
  numberOfPosts: number = 0;
  totalCommunities: number = 0;
  totalPosts: number = 0;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    // Load statistics for the specific community
    this.statisticsService.getNumberOfThreads(this.communityId).subscribe(
      (data) => {
        this.numberOfThreads = data;
      },
      (error) => {
        console.error('Error loading number of threads:', error);
      }
    );

    this.statisticsService.getNumberOfPosts(this.communityId).subscribe(
      (data) => {
        this.numberOfPosts = data;
      },
      (error) => {
        console.error('Error loading number of posts:', error);
      }
    );

    // Load total statistics for all communities
    this.statisticsService.getNumberOfCommunities().subscribe(
      (data) => {
        this.totalCommunities = data;
      },
      (error) => {
        console.error('Error loading number of communities:', error);
      }
    );

    this.statisticsService.getTotalNumberOfPosts().subscribe(
      (data) => {
        this.totalPosts = data;
      },
      (error) => {
        console.error('Error loading total number of posts:', error);
      }
    );
  }
}
