import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService, Student } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})
export class StudentUpdateComponent implements OnInit {
  student: Student = {
    name: '',
    studentId: 0,
    major: '',
    cv: '',
    phoneNumber: '',
    email: '',
    age: 0,
    gpa: 0
  };

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.studentService.getStudentById(id).subscribe(
        (data) => this.student = data,
        (error) => console.error('Error fetching student:', error)
      );
    }
  }

  updateStudent(): void {
    if (this.student.studentId) {
      this.studentService.updateStudent(this.student.studentId, this.student).subscribe(
        () => {
          alert('Student updated successfully!');
          this.router.navigate(['/students']);
        },
        (error) => {
          console.error('Error updating student:', error);
          alert('Failed to update student.');
        }
      );  
    }
  }
}
