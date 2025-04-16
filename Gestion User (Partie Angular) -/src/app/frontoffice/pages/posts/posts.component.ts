import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import * as bootstrap from 'bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  communityId!: number;
  selectedPost: any;

  newPost = {
    name: '',
    description: '',
    categorie: '',
    community: { communityId: null as number | null },
    dateCreation: null as Date | null
  };
  
  
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.communityId = +idParam;
      this.loadPosts();
    } else {
      console.error('Community ID not found in route parameters.');
    }
  }

  loadPosts(): void {
    this.postService.getPostsByCommunityId(this.communityId).subscribe(
      (data) => {
        this.posts = data;
      },
      (error) => {
        console.error('Error loading posts:', error);
      }
    );
  }

  deletePost(id: any): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(id).subscribe(() => {
        this.posts = this.posts.filter((post) => post.postId !== id);
      });
    }
  }

  viewComments(post: any): void {
    this.selectedPost = post;
    this.loadComments(post.postId);

    // Open the modal using Bootstrap JS
    const modalElement = document.getElementById('postModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  newComment: string = '';

  addComment() {
    if (this.newComment.trim()) {
      const commentData = {
        userName: 'Current User',
        description: this.newComment,
        post: { id: this.selectedPost?.id }
      };
      
      this.http.post('http://localhost:9090/replies', commentData)
        .subscribe(response => {
          console.log('Comment posted:', response);
          this.selectedPost.comments.push(commentData);
          this.newComment = '';
        }, error => {
          console.error('Error posting comment:', error);
        });
    }
  }

  openPostModal(): void {
    // Open the modal using Bootstrap JS
    const modalElement = document.getElementById('newPostModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  

  createPost() {
    // Ensure all fields are filled out
    if (!this.newPost.name || !this.newPost.description || !this.newPost.categorie) {
      alert('Please fill all fields!');
      return;
    }
  
    // Ensure communityId is set inside newPost.community
    if (this.communityId) {
      this.newPost.community.communityId = this.communityId;
    }
  
    // Set the current date and time for dateCreation
    this.newPost.dateCreation = new Date();
  
    // Send the new post object to the backend
    this.http.post('http://localhost:9090/posts', this.newPost)
      .subscribe(response => {
        console.log('Post created:', response);
        alert('Post created successfully!');
  
        // Close the modal using Bootstrap JS
        const modalElement = document.getElementById('newPostModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement); // Get the modal instance
          modal?.hide(); // Close the modal
        }
  
        // Reset the form
        this.newPost = { name: '', description: '', categorie: '', community: { communityId: null }, dateCreation: null };
      }, error => {
        console.error('Error creating post:', error);
      });
  }

  loadComments(postId: number): void {
    this.postService.getRepliesByPostId(postId).subscribe(
      (comments) => {
        console.log(comments)
        this.selectedPost.comments = comments;
      },
      (error) => {
        console.error('Error loading comments:', error);
      }
    );
  }
}
