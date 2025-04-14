package com.esprit.internship.repo;

import com.esprit.internship.entity.Internship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InternshipRepo extends JpaRepository<Internship, Long> {
}
