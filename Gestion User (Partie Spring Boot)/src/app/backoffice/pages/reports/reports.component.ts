import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';

interface Report {
  id: number;
  type: string;
  contentId: number;
  reason: string;
  status: string;
  date: string;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reports: Report[] = [];
  currentDate: Date = new Date();
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.http.get<Report[]>('http://localhost:9090/report-content').subscribe(
      (data) => {
        this.reports = data;
      },
      (error) => {
        console.error('Error loading reports:', error);
      }
    );
  }

  getPendingCount(): number {
    return this.reports.filter(report => report.status === 'pending').length;
  }

  getResolvedCount(): number {
    return this.reports.filter(report => report.status === 'resolved').length;
  }

  exportReport(): void {   // Export report to PDF
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    let yPosition = margin;

    // Title
    doc.setFontSize(20);
    doc.setTextColor(44, 62, 80);
    doc.text('Content Moderation Reports', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 10;

    // Subtitle
    doc.setFontSize(12);
    doc.setTextColor(127, 140, 141);
    doc.text(`Generated on: ${this.currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`, 
             pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Summary
    doc.setFontSize(14);
    doc.setTextColor(52, 73, 94);
    doc.text('Summary', margin, yPosition);
    yPosition += 10;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Total Reports: ${this.reports.length}`, margin, yPosition);
    yPosition += 5;
    doc.text(`Pending Review: ${this.getPendingCount()}`, margin, yPosition);
    yPosition += 5;
    doc.text(`Resolved: ${this.getResolvedCount()}`, margin, yPosition);
    yPosition += 15;

    // Reports Header
    doc.setFontSize(14);
    doc.setTextColor(52, 73, 94);
    doc.text('Reported Content', margin, yPosition);
    yPosition += 10;

    // Reports List
    doc.setFontSize(10);
    this.reports.forEach((report, index) => {
      const reportText = `${index + 1}. ${report.type} Report #${report.id} - Content ID: ${report.contentId}`;
      const reasonText = `   Reason: ${report.reason}`;
      const statusText = `   Status: ${report.status.charAt(0).toUpperCase() + report.status.slice(1)}`;
      const dateText = report.date ? `   Reported On: ${new Date(report.date).toLocaleString()}` : '';

      if (yPosition + 20 > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        yPosition = margin;
      }

      doc.setTextColor(0, 0, 0);
      doc.text(reportText, margin, yPosition);
      yPosition += 5;
      doc.text(reasonText, margin, yPosition);
      yPosition += 5;
      doc.text(statusText, margin, yPosition);
      yPosition += 5;
      if (dateText) {
        doc.text(dateText, margin, yPosition);
        yPosition += 5;
      }
      yPosition += 5;
    });

    // Footer
    const pageCount = doc.getNumberOfPages(); // Fixed method here
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(127, 140, 141);
      doc.text(`Page ${i} of ${pageCount} | © 2025 xAI Content Moderation Team`, 
               pageWidth / 2, doc.internal.pageSize.getHeight() - margin, { align: 'center' });
    }

    doc.save('Content_Moderation_Reports.pdf'); // Save PDF
  }

  navigateToContent(type: string, contentId: number): void {
    if (type.toLowerCase() === 'post') {
      this.router.navigate(['admin/posts']);
    } else if (type.toLowerCase() === 'reply' || type.toLowerCase() === 'comment') {
      this.router.navigate(['admin/replies']);
    } else {
      console.warn(`Unknown content type: ${type}`);
    }
  }

  resolveReport(reportId: number): void {
    this.http.put(`http://localhost:9090/report-content/${reportId}/resolve`, {}).subscribe(
      () => {
        const report = this.reports.find(r => r.id === reportId);
        if (report) {
          report.status = 'resolved';
        }
        console.log(`Report ${reportId} marked as resolved`);
      },
      (error) => {
        console.error('Error resolving report:', error);
      }
    );
  }
}