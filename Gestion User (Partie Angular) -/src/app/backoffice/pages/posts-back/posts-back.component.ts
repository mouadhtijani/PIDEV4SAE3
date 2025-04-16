import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts-back',
  templateUrl: './posts-back.component.html',
  styleUrls: ['./posts-back.component.css']
})
export class PostsBackComponent implements OnInit {
  posts: any[] = [];
  post: any = { name: '', description: '', categorie: '', dateCreation: '' };
  postToEdit: any = null;  // For editing a post
  isEditing: boolean = false;
  postCategories: string[] = ['SoftwareEng', 'DataSc', 'BI', 'NEDS', 'Cloud'];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  // Load all posts from the backend
  loadPosts(): void {
    this.postService.getAllPosts().subscribe(
      (data) => {
        console.log('Fetched posts:', data);
        this.posts = data;
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  // Create a new post
  createPost(): void {
    if (this.post.name && this.post.description && this.post.categorie) {
      this.postService.createPost(this.post).subscribe(
        (data) => {
          this.posts.push(data);  // Add the new post to the list
          console.log('Post created:', data);
          this.post = { name: '', description: '', categorie: '', dateCreation: '' };  // Reset form
        },
        (error) => {
          console.error('Error creating post:', error);
        }
      );
    }
  }

  // Get a post by ID for editing
  getPost(postId: number): void {
    this.postService.getPostById(postId).subscribe(
      (data) => {
        this.postToEdit = data;
        this.isEditing = true;  // Switch to edit mode
      },
      (error) => {
        console.error('Error fetching post:', error);
      }
    );
  }

  // Update a post
  updatePost(postId: number): void {
    if (this.postToEdit.name && this.postToEdit.description && this.postToEdit.categorie) {
      this.postService.updatePost(postId, this.postToEdit).subscribe(
        (data) => {
          const index = this.posts.findIndex(p => p.Id === postId);  // Fixed to match 'Id' field
          this.posts[index] = data;  // Update the post in the list
          console.log('Post updated:', data);
          this.isEditing = false;
          this.postToEdit = null;  // Reset editing state
        },
        (error) => {
          console.error('Error updating post:', error);
        }
      );
    }
  }

  // Delete a post
  deletePost(postId: number): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(postId).subscribe(
        () => {
          this.posts = this.posts.filter(p => p.Id !== postId);  // Fixed to match 'Id' field
          console.log('Post deleted');
        },
        (error) => {
          console.error('Error deleting post:', error);
        }
      );
    }
  }

  // Cancel editing a post
  cancelEdit(): void {
    this.isEditing = false;
    this.postToEdit = null;
  }
}
