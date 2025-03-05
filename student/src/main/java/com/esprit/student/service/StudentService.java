package com.esprit.student.service;

import com.esprit.student.entity.Student;
import com.esprit.student.repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepo studentRepository;

    // ➕ Create or Update a Student
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    // 🔍 Get Student by ID
    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    // 📋 Get All Students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // ❌ Delete Student by ID
    public void deleteStudentById(Long id) {
        studentRepository.deleteById(id);
    }

    // 🔍 Find Student by Email
    public Optional<Student> getStudentByEmail(String email) {
        return studentRepository.findByEmail(email);
    }

    // 🔍 Find Students by Major
    public List<Student> getStudentsByMajor(String major) {
        return studentRepository.findByMajor(major);
    }

  /*  public List<Student> findAllStudentsByCompany(Long companyyId) {
        return studentRepository.findAllByCompanyId(companyyId);
    }*/
}
