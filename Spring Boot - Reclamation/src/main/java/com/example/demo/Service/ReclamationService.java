// src/main/java/com/example/demo/Service/ReclamationService.java
package com.example.demo.Service;

import com.example.demo.Entity.HistoryEntry;
import com.example.demo.Entity.Reclamation;
import com.example.demo.Entity.ReclamationStatus;
import com.example.demo.Repository.HistoryRepository;
import com.example.demo.Repository.ReclamationRepository;
import com.example.demo.Entity.ActionType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReclamationService {

    @Autowired
    private ReclamationRepository repository;

    @Autowired
    private HistoryRepository historyRepository;

    public Reclamation createReclamation(Reclamation reclamation) {
        Reclamation saved = repository.save(reclamation);

        HistoryEntry entry = new HistoryEntry();
        entry.setActionType(ActionType.CREATION);
        entry.setTimestamp(LocalDateTime.now());
        entry.setReclamation(saved);
        historyRepository.save(entry);

        return saved;
    }

    public Reclamation updateAdminResponse(Long id, String adminResponse) {
        Reclamation reclamation = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Réclamation non trouvée"));

        reclamation.setAdminResponse(adminResponse);
        reclamation.setStatus(ReclamationStatus.RESOLVED);
        Reclamation saved = repository.save(reclamation);

        HistoryEntry entry = new HistoryEntry();
        entry.setActionType(ActionType.RESPONSE);
        entry.setTimestamp(LocalDateTime.now());
        entry.setReclamation(saved);
        historyRepository.save(entry);

        return saved;
    }

    public List<HistoryEntry> getFullHistory() {
        return historyRepository.findAllByOrderByTimestampDesc();
    }

    public List<Reclamation> getAllReclamations() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    public List<Reclamation> getUserReclamations(String userId) {
        return repository.findByUserId(userId);
    }
}
