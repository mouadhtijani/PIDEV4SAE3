package com.esprit.student.repo;

import com.esprit.student.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepo extends JpaRepository<Student, Long> {

    // 🔍 Find a student by email
    Optional<Student> findByEmail(String email);

    // 🔍 Find students by major
    List<Student> findByMajor(String major);

    // 🔥 Custom CRUD methods (already provided by JpaRepository, but shown explicitly)

    // ➕ Create or update a student
    default Student saveStudent(Student student) {
        return save(student);
    }

    // 🔍 Read a student by ID
    default Optional<Student> getStudentById(Long id) {
        return findById(id);
    }

    // 📋 Get all students
    default List<Student> getAllStudents() {
        return findAll();
    }

    // ❌ Delete a student by ID
    default void deleteStudentById(Long id) {
        deleteById(id);
    }


  //  List<Student> findAllByCompanyId(Long companyyId);
}