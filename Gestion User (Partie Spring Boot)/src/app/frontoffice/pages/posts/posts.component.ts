import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PostService } from 'src/app/services/post.service';
import { NotificationService } from 'src/app/services/notification.service';
import { VoteServiceService } from 'src/app/services/vote-service.service';
import * as bootstrap from 'bootstrap';

// Define interfaces
interface NewPost {
  name: string;
  description: string;
  categorie: string;
  userId: number;
  community: { communityId: number | null };
  dateCreation: Date | null;
  sentiment?: string;
  img?: string;
}

interface UserPoints {
  id: number;
  userId: number;
  points: number;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  filteredPosts: any[] = [];
  communityId!: number;
  connectedUserId: number = 15;   //peut changer
  selectedPost: any;
  reportData = { type: '', contentId: 0, reason: '' };
  searchText: string = '';
  sortOption: string = 'name';
  notifications: any[] = [];
  unreadNotifications = 0;
  notificationsVisible = false;
  userVotes: { [postId: number]: string } = {};
  showOnlyMyPosts: boolean = false;
  userPoints: UserPoints | null = null;
  userPointsMap: { [userId: number]: number } = {};

  newPost: NewPost = {
    name: '',
    description: '',
    categorie: '',
    userId: this.connectedUserId,
    community: { communityId: null },
    dateCreation: null,
  
  };

  newComment: string = '';
  selectedImage: File | null = null;


  constructor(
    private postService: PostService,
    private voteService: VoteServiceService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.communityId = +idParam;
      this.newPost.userId = this.connectedUserId;
      this.loadPosts();
      this.loadNotifications();
      this.loadUserPoints(); // Load current user's points
    } else {
      console.error('Community ID not found in route parameters.');
    }
  }

  loadPosts(): void {
    this.postService.getPostsByCommunityId(this.communityId).subscribe(
      (data) => {
        this.posts = data.map((post: any) => ({ ...post, comments: [] }));
        this.filteredPosts = [...this.posts];
        this.applyFilters();
        this.loadAllUserPoints(); // Load points for all users after posts are fetched
      },
      (error) => console.error('Error loading posts:', error)
    );
  }

  loadUserPoints(): void {
    this.http.get<UserPoints>(`http://localhost:9090/user-points/${this.connectedUserId}`).subscribe( 
      (data) => {
        this.userPoints = data;
        this.userPointsMap[this.connectedUserId] = data.points; // Add to map
      },
      (error) => console.error('Error loading user points:', error)
    );
  }

  loadAllUserPoints(): void {
    // Extract unique userIds from posts
    const userIds = [...new Set(this.posts.map(post => post.userId))];
    // Fetch points for each user
    userIds.forEach(userId => {
      if (!this.userPointsMap[userId]) { // Avoid redundant calls
        this.http.get<UserPoints>(`http://localhost:9090/user-points/${userId}`).subscribe( //URL pour get les points de l'utilisateur
          (data) => {
            this.userPointsMap[userId] = data.points;
          },
          (error) => console.error(`Error loading points for user ${userId}:`, error)
        );
      }
    });
  }

  toggleMyPostsFilter(): void {
    this.showOnlyMyPosts = !this.showOnlyMyPosts;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredPosts = this.posts.filter(post => {
      const matchesSearch =
        post.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        post.description.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesUser = this.showOnlyMyPosts ? post.userId === this.connectedUserId : true;
      return matchesSearch && matchesUser;
    });
    this.sortPosts();
  }

  onSortChange(): void {
    this.sortPosts();
  }

  sortPosts(): void { //comparer les posts selon le sortOption
    if (this.sortOption === 'name') {
      this.filteredPosts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortOption === 'date') {
      this.filteredPosts.sort((a, b) => new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime());
    } else if (this.sortOption === 'category') {
      this.filteredPosts.sort((a, b) => a.categorie.localeCompare(b.categorie));
    } else if (this.sortOption === 'votes') {
      this.filteredPosts.sort((a, b) => b.voteCount - a.voteCount);
    }
  }

  vote(postId: number, voteType: string): void {
    this.voteService.vote(postId, voteType, this.connectedUserId).subscribe(
      () => {
        this.userVotes[postId] = voteType;
        this.loadPosts();
        this.loadUserPoints();
      },
      (error) => console.error('Voting failed:', error)
    );
  }

  userVoted(postId: number, voteType: string): boolean {
    return this.userVotes[postId] === voteType;
  }

  deletePost(id: number): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(id).subscribe(
        () => {
          this.posts = this.posts.filter((post) => post.id !== id);
          this.applyFilters();
        },
        (error) => console.error('Error deleting post:', error)
      );
    }
  }

  viewComments(post: any): void {
    this.selectedPost = post;
    this.loadComments(post.id);
    const modalElement = document.getElementById('postModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
    const existingBackdrop = document.querySelector('.modal-backdrop');
    if (existingBackdrop) existingBackdrop.remove();
  }

  addComment(): void {
    if (this.newComment.trim() && this.selectedPost) {
      const commentData = {
        userName: 'Current User',
        description: this.newComment,
        post: { id: this.selectedPost.id }
      };
      this.http.post('http://localhost:9090/replies', commentData).subscribe( //URL pour poster un commentaire
        (response) => {
          this.selectedPost.comments.push(commentData);
          this.newComment = '';
        },
        (error) => console.error('Error posting comment:', error)
      );
    }
  }

  openPostModal(): void {
    const modalElement = document.getElementById('newPostModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
    const existingBackdrop = document.querySelector('.modal-backdrop');
    if (existingBackdrop) existingBackdrop.remove();
  }

  createPost(): void {
    if (!this.newPost.name || !this.newPost.description || !this.newPost.categorie) {
      alert('Please fill all fields!');
      return;
    }
  
    const formData = new FormData();
  
    // Prepare the post data (send community as part of the postData object)
    const postData = {
      name: this.newPost.name,
      description: this.newPost.description,
      categorie: this.newPost.categorie,
      userId: this.connectedUserId,
      community: { communityId: this.communityId }  // Send the community object with communityId
    };
  
    // Append postData to FormData as a JSON string
    formData.append('postData', JSON.stringify(postData));
  
    // Append the image file to FormData if selected
    if (this.selectedImage) {
      formData.append('file', this.selectedImage, this.selectedImage.name);
    }
  
    // Send the FormData to the backend
    this.postService.createPost(formData).subscribe(
      (data) => {
        alert('Post created successfully!');
        const modalElement = document.getElementById('newPostModal');
        if (modalElement) bootstrap.Modal.getInstance(modalElement)?.hide();
  
        // Set the img URL returned by the backend
        this.newPost = { name: '', description: '', categorie: '', userId: this.connectedUserId, community: { communityId: null }, dateCreation: null };
        this.loadPosts(); // Reload posts after creating a new one
      },
      (error) => {
        console.error('Error creating post:', error);
      }
    );
  }

  
//traitement de la fonction reportContent
  reportContent(type: string, id: number): void {
    this.reportData.type = type;
    this.reportData.contentId = id;
    const reason = prompt('Please provide a reason for reporting this content:'); //le raison pour lequel on signale le contenu
    if (reason) {
      this.reportData.reason = reason;
      this.submitReport();
    }
  }
//traitement de la fonction submitReport
  submitReport(): void {
    this.http.post('http://localhost:9090/report-content', this.reportData).subscribe( //URL pour submit le report eli fil controller spring
      (response) => {
        alert('Thank you for your report! We will review the content.');
        this.loadUserPoints();
      },
      (error) => console.error('Error submitting report:', error)
    );
  }
//traitement de la fonction loadNotifications selon community id
  loadNotifications(): void {
    this.notificationService.getNotifications(this.communityId).subscribe(
      (data) => {
        this.notifications = data;
        this.unreadNotifications = data.filter((n: any) => !n.read).length;
      },
      (error) => console.error('Error loading notifications:', error)
    );
  }
//ouver ou ferme la bell
  toggleNotifications(): void {
    this.notificationsVisible = !this.notificationsVisible;
    const modalElement = document.getElementById('notificationsModal');
    if (this.notificationsVisible && modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
      this.markNotificationsAsRead();
    } else if (!this.notificationsVisible && modalElement) {
      bootstrap.Modal.getInstance(modalElement)?.hide();
    }
    const existingBackdrop = document.querySelector('.modal-backdrop');
    if (existingBackdrop) existingBackdrop.remove();
  }

  markNotificationsAsRead(): void {
    this.notifications.forEach(n => { if (!n.read) { n.read = true; this.unreadNotifications--; } });
  }

  loadComments(postId: number): void {
    this.postService.getRepliesByPostId(postId).subscribe(
      (comments) => this.selectedPost.comments = comments,
      (error) => console.error('Error loading comments:', error)
    );
  }
}