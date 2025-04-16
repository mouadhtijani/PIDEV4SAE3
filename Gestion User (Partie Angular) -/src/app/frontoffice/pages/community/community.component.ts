import { Component } from '@angular/core';
import { CommunityService } from 'src/app/services/community.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent {
  communities: any[] = [];
  community: any = {};

  constructor(private communityService: CommunityService) {}

  ngOnInit(): void {
    this.loadCommunities();
  }

  loadCommunities(): void {
    this.communityService.getAllCommunities().subscribe(
      (data) => {
        console.log('Fetched communities:', data);
        this.communities = data;
      },
      (error) => {
        console.error('Error fetching communities', error);
      }
    );
  }

  getCommunity(id: number): void {
    this.communityService.getCommunityById(id).subscribe(
      (data) => {
        this.community = data;
      },
      (error) => {
        console.error('Error fetching community', error);
      }
    );
  }
}
