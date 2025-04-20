// src/main/java/com/example/demo/Repository/ReclamationRepository.java
package com.example.demo.Repository;

import com.example.demo.Entity.Reclamation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReclamationRepository extends JpaRepository<Reclamation, Long> {
    List<Reclamation> findByUserId(String userId);
    List<Reclamation> findAllByOrderByCreatedAtDesc();
}