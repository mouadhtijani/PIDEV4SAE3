import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service'; // Adjust path
import { ReplyService } from 'src/app/services/reply-service.service';

interface Reply {
  replyId: number;
  userName: string;
  description: string;
  post: { id: number };
}

@Component({
  selector: 'app-replies-back',
  templateUrl: './replies-back.component.html',
  styleUrls: ['./replies-back.component.css']
})
export class RepliesBackComponent implements OnInit {
  replies: Reply[] = [];
  filteredReplies: Reply[] = [];
  posts: any[] = [];
  replyForm: FormGroup;
  replyToEdit: Reply | undefined; // Already correctly typed as Reply | undefined
  isEditing: boolean = false;
  filterReplyUserName: string = '';
  sortOrder: keyof Reply = 'userName';

  constructor(
    private replyService: ReplyService,
    private postService: PostService,
    private fb: FormBuilder
  ) {
    this.replyForm = this.fb.group({
      description: ['', Validators.required],
      postId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadReplies();
    this.loadPosts();
  }

  loadReplies(): void {
    this.replyService.getAllReplies().subscribe(
      (data) => {
        console.log(data)
        this.replies = data;
        this.filteredReplies = [...this.replies];
        this.applyReplyFilter();
      },
      (error) => {
        console.error('Error fetching replies:', error);
      }
    );
  }

  loadPosts(): void {
    this.postService.getAllPosts().subscribe(
      (data) => {
        this.posts = data;
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  applyReplyFilter(): void {
    this.filteredReplies = this.replies.filter(reply =>
      reply.userName.toLowerCase().includes(this.filterReplyUserName.toLowerCase())
    );
    this.sortReplies(this.sortOrder);
  }

  sortReplies(field: keyof Reply): void {
    this.sortOrder = field;
    this.filteredReplies.sort((a, b) => {
      const valueA = a[field] as string;
      const valueB = b[field] as string;
      return valueA.localeCompare(valueB);
    });
  }

  createReply(): void {
    if (this.replyForm.valid) {
      const newReply= {
        userName: 'Current User',
        description: this.replyForm.value.description,
        post: { id: this.replyForm.value.postId }
      };
      this.replyService.createReply(newReply).subscribe(
        (data) => {
          this.replies.push(data);
          this.replyForm.reset({ postId: null });
          this.applyReplyFilter();
        },
        (error) => {
          console.error('Error creating reply:', error);
        }
      );
    }
  }

  getReply(replyId: number): void {
    this.replyService.getReplyById(replyId).subscribe(
      (data) => {
        this.replyToEdit = data;
        this.isEditing = true;
        this.replyForm.patchValue({
          description: data.description,
        });
      },
      (error) => {
        console.error('Error fetching reply:', error);
      }
    );
  }

  updateReply(replyId: number): void {
    if (this.replyForm.valid && this.replyToEdit) {
      const updatedReply: Reply = {
        ...this.replyToEdit,
        description: this.replyForm.value.description,
        post: { id: this.replyForm.value.postId }
      };
      this.replyService.updateReply(replyId, updatedReply).subscribe(
        (data) => {
          const index = this.replies.findIndex(r => r.replyId === replyId);
          this.replies[index] = data;
          this.isEditing = false;
          this.replyToEdit = undefined; // Changed to undefined instead of null
          this.replyForm.reset({ postId: null });
          this.applyReplyFilter();
        },
        (error) => {
          console.error('Error updating reply:', error);
        }
      );
    }
  }

  deleteReply(replyId: number): void {
    if (confirm('Are you sure you want to delete this reply?')) {
      this.replyService.deleteReply(replyId).subscribe(
        () => {
          this.replies = this.replies.filter(r => r.replyId !== replyId);
          this.applyReplyFilter();
        },
        (error) => {
          console.error('Error deleting reply:', error);
        }
      );
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.replyToEdit = undefined; // Changed to undefined instead of null
    this.replyForm.reset({ postId: null });
  }

  getPostName(postId: number | undefined): string {
    const post = this.posts.find(p => p.id === postId);
    return post ? post.name : 'Unknown';
  }
}