package com.esprit.application.repo;

import com.esprit.application.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ApplicationRepo extends JpaRepository<Application, Long> {
    List<Application> findByStudentId(String studentId);
    List<Application> findByInternshipId(Long internshipId);
    Optional<Application> findFirstByStudentIdOrderBySubmissionDateDesc(String studentId);

    // ✅ This is the correct method for searching by studentId (partial match)
    List<Application> findByStudentIdContaining(String studentId);
}
