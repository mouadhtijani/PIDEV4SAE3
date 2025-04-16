import { Component, OnInit } from '@angular/core';
import { CommunityService } from 'src/app/services/community.service';

@Component({
  selector: 'app-community-back',
  templateUrl: './community-back.component.html',
  styleUrls: ['./community-back.component.css']
})
export class CommunityBackComponent implements OnInit {
  communities: any[] = [];
  community: any = { name: '' };  // Removed description field
  communityToEdit: any = null; // For editing a community
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
      },
      (error) => {
        console.error('Error fetching communities', error);
      }
    );
  }

  createCommunity(): void {
    if (this.community.name) {  // Removed description check
      this.communityService.createCommunity(this.community).subscribe(
        (data) => {
          this.communities.push(data);
          console.log('Community created:', data);
          this.community = { name: '' }; // Reset form (removed description)
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
    if (this.communityToEdit.name) {  // Removed description check
      this.communityService.updateCommunity(communityId, this.communityToEdit).subscribe(
        (data) => {
          const index = this.communities.findIndex(c => c.communityId === communityId);
          this.communities[index] = data;
          console.log('Community updated:', data);
          this.isEditing = false;
          this.communityToEdit = null; // Reset editing state
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
