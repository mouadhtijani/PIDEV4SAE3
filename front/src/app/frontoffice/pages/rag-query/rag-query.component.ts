import { Component } from '@angular/core';
import { RagService } from 'src/app/services/rag.service';

@Component({
  selector: 'app-rag-query',
  templateUrl: './rag-query.component.html',
  styleUrls: ['./rag-query.component.css']
})
export class RagQueryComponent {
  userQuery: string = '';
  response: string = '';
  loading: boolean = false;

  constructor(private ragService: RagService) {}

  submitQuery() {
    if (!this.userQuery.trim()) return;

    this.loading = true;
    this.ragService.getAnswer(this.userQuery).subscribe({
      next: (res) => {
        this.response = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.response = "Error fetching response.";
        this.loading = false;
      }
    });
  }
}
