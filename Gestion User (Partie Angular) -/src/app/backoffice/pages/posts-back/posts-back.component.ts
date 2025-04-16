import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { CommunityService } from 'src/app/services/community.service';

interface Post {
  id: number;
  name: string;
  description: string;
  categorie: string;
  userId: number;
  dateCreation: string;
  community: { communityId: number | null };
}

@Component({
  selector: 'app-posts-back',
  templateUrl: './posts-back.component.html',
  styleUrls: ['./posts-back.component.css']
})
export class PostsBackComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  postForm: FormGroup;
  postToEdit: Post | null = null;
  isEditing: boolean = false;
  connectedUserId: number = 1; // Replace with auth logic
  showOnlyMyPosts: boolean = false;
  postCategories: string[] = ['SoftwareEng', 'DataSc', 'BI', 'NEDS', 'Cloud'];
  communities: any[] = [];
  filterName: string = '';
  filterCategory: string = '';
  filterCommunity: string = '';
  sortOrder: keyof Post = 'name'; // Default sort

  constructor(
    private postService: PostService,
    private communityService: CommunityService,
    private fb: FormBuilder
  ) {
    this.postForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      categorie: ['', Validators.required],
      communityId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPosts();
    this.loadCommunities();
  }

  loadPosts(): void {
    this.postService.getAllPosts().subscribe(
      (data) => {
        this.posts = data;
        this.filteredPosts = [...this.posts];
        this.applyFilter();
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  loadCommunities(): void {
    this.communityService.getAllCommunities().subscribe(
      (data) => {
        this.communities = data;
      },
      (error) => {
        console.error('Error fetching communities:', error);
      }
    );
  }
  //filter post selon  le nom, la catégorie, la communauté et l'utilisateur connecté, puis applique un tri.
  applyFilter(): void {
    this.filteredPosts = this.posts.filter(post => {
      const matchesName = post.name.toLowerCase().includes(this.filterName.toLowerCase());
      const matchesCategory = this.filterCategory ? post.categorie === this.filterCategory : true;
      const matchesCommunity = this.filterCommunity ? post.community.communityId === Number(this.filterCommunity) : true;
      const matchesUser = this.showOnlyMyPosts ? post.userId === this.connectedUserId : true;
      return matchesName && matchesCategory && matchesCommunity && matchesUser;
    });
    this.sortPosts(this.sortOrder);
  }
//active/désactive le filtre pour afficher uniquement les posts de l'utilisateur connecté
  toggleMyPostsFilter(): void {
    this.showOnlyMyPosts = !this.showOnlyMyPosts;
    this.applyFilter();
  }

  sortPosts(field: keyof Post): void {
    this.sortOrder = field;
    if (field) {
      this.filteredPosts.sort((a, b) => {
        if (field === 'dateCreation') {
          return new Date(b[field]).getTime() - new Date(a[field]).getTime();
        }
        const valueA = a[field] as string | number;
        const valueB = b[field] as string | number;
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      });
    }
  }

  createPost(): void {
    if (this.postForm.valid) {
      const newPost = {
        name: this.postForm.value.name,
        description: this.postForm.value.description,
        categorie: this.postForm.value.categorie,
        userId: this.connectedUserId,
        dateCreation: new Date().toISOString(),
        community: { communityId: this.postForm.value.communityId }
      };
      this.postService.createPost(newPost).subscribe(
        (data) => {
          this.posts.push(data);
          this.postForm.reset({ communityId: null });
          this.applyFilter();
        },
        (error) => {
          console.error('Error creating post:', error);
        }
      );
    }
  }

  getPost(postId: number): void {
    this.postService.getPostById(postId).subscribe(
      (data) => {
        console.log(data)
        this.postToEdit = data;
        this.isEditing = true;
        this.postForm.patchValue({
          name: data.name,
          description: data.description,
          categorie: data.categorie,
        });
      },
      (error) => {
        console.error('Error fetching post:', error);
      }
    );
  }

  updatePost(postId: number): void {
    if (this.postForm.valid && this.postToEdit) {
      const updatedPost: Post = {
        ...this.postToEdit,
        name: this.postForm.value.name,
        description: this.postForm.value.description,
        categorie: this.postForm.value.categorie,
        community: { communityId: this.postForm.value.communityId }
      };
      this.postService.updatePost(postId, updatedPost).subscribe(
        (data) => {
          const index = this.posts.findIndex(p => p.id === postId);
          this.posts[index] = data;
          this.isEditing = false;
          this.postToEdit = null;
          this.postForm.reset({ communityId: null });
          this.applyFilter();
        },
        (error) => {
          console.error('Error updating post:', error);
        }
      );
    }
  }

  deletePost(postId: number): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(postId).subscribe(
        () => {
          this.posts = this.posts.filter(p => p.id !== postId);
          this.applyFilter();
        },
        (error) => {
          console.error('Error deleting post:', error);
        }
      );
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.postToEdit = null;
    this.postForm.reset({ communityId: null });
  }

  getCommunityName(communityId: number | null): string {
    const community = this.communities.find(c => c.communityId === communityId);
    return community ? community.name : 'Unknown';
  }
}