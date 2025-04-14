package com.esprit.reclamation.service;

import com.esprit.reclamation.entity.Reclamation;
import com.esprit.reclamation.repo.ReclamationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReclamationService {

    private final ReclamationRepository repo;

    public ReclamationService(ReclamationRepository repo) {
        this.repo = repo;
    }

    public Reclamation create(Reclamation reclamation) {
        reclamation.setDateCreation(LocalDate.now());
        return repo.save(reclamation);
    }

    public List<Reclamation> getAll() {
        return repo.findAll();
    }

    public List<Reclamation> getByUserType(String typeUser) {
        return repo.findByTypeUser(typeUser);
    }

    public List<Reclamation> getByNomUser(String nomUser) {
        return repo.findByNomUser(nomUser);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
