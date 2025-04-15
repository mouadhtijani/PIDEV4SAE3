package com.esprit.reclamation.repo;

import com.esprit.reclamation.entity.Response;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResponseRepository extends JpaRepository<Response, Long> {
    // This method returns a list of responses for a given reclamation ID
    List<Response> findByReclamationId(Long reclamationId);
}
