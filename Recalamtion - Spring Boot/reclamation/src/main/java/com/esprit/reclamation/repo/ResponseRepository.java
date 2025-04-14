package com.esprit.reclamation.repo;

import com.esprit.reclamation.entity.Response;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResponseRepository extends JpaRepository<Response, Long> {
    Optional<Response> findByReclamationId(Long reclamationId);
}
