import { Component, OnInit } from '@angular/core';
import { StudentService, Student } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: 'student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  chartData: { name: string; value: number }[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.studentService.getAllStudents().subscribe(
      (data) => {
        this.students = data;
        this.updateChartData();
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  updateChartData(): void {
    const majorCount: { [key: string]: number } = {};
    this.students.forEach(student => {
      majorCount[student.major] = (majorCount[student.major] || 0) + 1;
    });

    this.chartData = Object.keys(majorCount).map(major => ({
      name: major,
      value: majorCount[major]
    }));
  }

  deleteStudent(id: number | undefined): void {
    if (id === undefined) {
      alert('Invalid student ID.');
      return;
    }
  
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          alert('Student deleted successfully!');
          window.location.reload(); // Hard reload the entire page
        },
        error: (error) => {
          console.error('Error deleting student:', error);
          window.location.reload(); // Hard reload the entire page

          alert('Failed to delete student. Please try again.');
        }
      });
    }
  }
  
}
