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
  searchText: string = ''; // Filter text
  sortOption: string = 'name'; // Default sort by name

  constructor(private communityService: CommunityService) {}

  ngOnInit(): void {
    this.loadCommunities();
  }

  loadCommunities(): void {
    this.communityService.getAllCommunities().subscribe(
      (data) => {
        console.log('Fetched communities:', data);
        this.communities = data;
        this.sortCommunities();
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

  // Filter communities based on the search text
  get filteredCommunities(): any[] {
    return this.communities.filter(community =>
      community.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // Sort communities based on the selected option
  sortCommunities(): void {
    if (this.sortOption === 'name') {
      this.communities.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortOption === 'date') {
      this.communities.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
    }
  }

  // Handle changes in sorting option
  onSortChange(): void {
    this.sortCommunities();
  }
}
