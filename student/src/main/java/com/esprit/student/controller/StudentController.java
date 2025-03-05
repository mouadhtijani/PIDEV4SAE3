package com.esprit.student.controller;

import com.esprit.student.entity.Student;
import com.esprit.student.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // ➕ Create or Update Student
    @PostMapping("/add")
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        System.out.println("Received Student: " + student); // Debugging log
        Student savedStudent = studentService.saveStudent(student);
        return ResponseEntity.ok(savedStudent);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student studentDetails) {
        Optional<Student> studentOptional = studentService.getStudentById(id);

        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();
            student.setName(studentDetails.getName());
            student.setMajor(studentDetails.getMajor());
            student.setCv(studentDetails.getCv());
            student.setPhoneNumber(studentDetails.getPhoneNumber());
            student.setEmail(studentDetails.getEmail());
            student.setAge(studentDetails.getAge());
            student.setGpa(studentDetails.getGpa());

            Student updatedStudent = studentService.saveStudent(student);
            return ResponseEntity.ok(updatedStudent);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    // 🔍 Get Student by ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Optional<Student> student = studentService.getStudentById(id);
        return student.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 📋 Get All Students
    @GetMapping("/all")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    // ❌ Delete Student by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudentById(id);
        return ResponseEntity.ok("Student deleted successfully!");
    }

    // 🔍 Find Student by Email
    @GetMapping("/email/{email}")
    public ResponseEntity<Student> getStudentByEmail(@PathVariable String email) {
        Optional<Student> student = studentService.getStudentByEmail(email);
        return student.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 🔍 Find Students by Major
    @GetMapping("/major/{major}")
    public List<Student> getStudentsByMajor(@PathVariable String major) {
        return studentService.getStudentsByMajor(major);
    }
  /*  @GetMapping("/company/{companyId}")
    public ResponseEntity<List<Student>> findAllStudents(
            @PathVariable("companyId") Long companyyId
    ){
        return ResponseEntity.ok(studentService.findAllStudentsByCompany(companyyId));
    }*/
}
