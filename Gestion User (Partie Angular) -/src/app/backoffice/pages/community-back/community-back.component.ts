import { Component, OnInit } from '@angular/core';
import { CommunityService } from 'src/app/services/community.service';

@Component({
  selector: 'app-community-back',
  templateUrl: './community-back.component.html',
  styleUrls: ['./community-back.component.css']
})
export class CommunityBackComponent implements OnInit {
  communities: any[] = [];
  filteredCommunities: any[] = []; // Filtered and sorted communities
  filterCommunityName: string = ''; // Filter for community by name
  community: any = { name: '' };
  communityToEdit: any = null;
  isEditing: boolean = false;

  constructor(private communityService: CommunityService) {}

  ngOnInit(): void {
    this.loadCommunities(); 
  }

  loadCommunities(): void {
    this.communityService.getAllCommunities().subscribe(
      (data) => {
        console.log('Fetched communities:', data);
        this.communities = data;
        this.filteredCommunities = [...this.communities]; // 
      },
      (error) => {
        console.error('Error fetching communities', error);
      }
    );
  }

  applyCommunityFilter(): void {
    this.filteredCommunities = this.communities.filter(community =>
      community.name.toLowerCase().includes(this.filterCommunityName.toLowerCase())
    );
    this.sortCommunities('name'); // Apply sorting after filtering
  }

  sortCommunities(field: string): void {
    this.filteredCommunities.sort((a, b) => {
      if (a[field] < b[field]) {
        return -1;
      }
      if (a[field] > b[field]) {
        return 1;
      }
      return 0;
    });
  }

  createCommunity(): void {
    if (this.community.name) {
      this.communityService.createCommunity(this.community).subscribe(
        (data) => {
          this.communities.push(data);
          this.filteredCommunities.push(data); // Add newly created community to filtered list
          console.log('Community created:', data);
          this.community = { name: '' };
        },
        (error) => {
          console.error('Error creating community:', error);
        }
      );
    }
  }

  getCommunity(communityId: number): void {
    this.communityService.getCommunityById(communityId).subscribe(
      (data) => {
        this.communityToEdit = data;
        this.isEditing = true;
      },
      (error) => {
        console.error('Error fetching community:', error);
      }
    );
  }

  updateCommunity(communityId: number): void {
    if (this.communityToEdit.name) {
      this.communityService.updateCommunity(communityId, this.communityToEdit).subscribe(
        (data) => {
          const index = this.communities.findIndex(c => c.communityId === communityId);
          this.communities[index] = data;
          this.filteredCommunities[index] = data; // Update filtered community list
          console.log('Community updated:', data);
          this.isEditing = false;
          this.communityToEdit = null;
        },
        (error) => {
          console.error('Error updating community:', error);
        }
      );
    }
  }

  deleteCommunity(communityId: number): void {
    if (confirm('Are you sure you want to delete this community?')) {
      this.communityService.deleteCommunity(communityId).subscribe(
        () => {
          this.communities = this.communities.filter(c => c.communityId !== communityId);
          this.filteredCommunities = this.filteredCommunities.filter(c => c.communityId !== communityId); // Remove from filtered list
          console.log('Community deleted');
        },
        (error) => {
          console.error('Error deleting community:', error);
        }
      );
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.communityToEdit = null;
  }
}
