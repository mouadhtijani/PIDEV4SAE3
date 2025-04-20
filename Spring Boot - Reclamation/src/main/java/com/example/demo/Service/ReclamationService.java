// src/main/java/com/example/demo/Service/ReclamationService.java
package com.example.demo.Service;

import com.example.demo.Entity.Reclamation;
import com.example.demo.Entity.ReclamationStatus;
import com.example.demo.Repository.ReclamationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReclamationService {

    @Autowired
    private ReclamationRepository repository;

    public Reclamation createReclamation(Reclamation reclamation) {
        return repository.save(reclamation);
    }

    public List<Reclamation> getAllReclamations() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    public Reclamation updateAdminResponse(Long id, String adminResponse) {
        Reclamation reclamation = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Réclamation non trouvée"));

        reclamation.setAdminResponse(adminResponse);
        reclamation.setStatus(ReclamationStatus.RESOLVED); // ← Changer de IN_PROGRESS à RESOLVED
        return repository.save(reclamation);
    }

    public List<Reclamation> getUserReclamations(String userId) {
        return repository.findByUserId(userId);
    }
}