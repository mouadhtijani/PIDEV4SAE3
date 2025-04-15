package com.esprit.reclamation.service;

import com.esprit.reclamation.entity.Reclamation;
import com.esprit.reclamation.repo.ReclamationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ReclamationService {

    private final ReclamationRepository repo;

    public ReclamationService(ReclamationRepository repo) {
        this.repo = repo;
    }

    // ✅ Créer une réclamation
    public Reclamation create(Reclamation reclamation) {
        reclamation.setDateCreation(LocalDate.now());  // On set la date de création
        return repo.save(reclamation);  // Sauvegarde la réclamation
    }

    // ✅ Récupérer toutes les réclamations
    public List<Reclamation> getAll() {
        return repo.findAll();  // Retourne toutes les réclamations
    }

    // ✅ Récupérer les réclamations par type d'utilisateur
    public List<Reclamation> getByUserType(String typeUser) {
        return repo.findByTypeUser(typeUser);  // Retourne les réclamations filtrées par type d'utilisateur
    }

    // ✅ Récupérer les réclamations par nom d'utilisateur
    public List<Reclamation> getByNomUser(String nomUser) {
        return repo.findByNomUser(nomUser);  // Retourne les réclamations filtrées par nom d'utilisateur
    }

    // ✅ Supprimer une réclamation
    @Transactional
    public void delete(Long id) {
        Optional<Reclamation> reclamation = repo.findById(id);  // Recherche la réclamation par ID
        if (reclamation.isPresent()) {
            repo.deleteById(id);  // Supprime la réclamation si elle existe
        } else {
            throw new IllegalArgumentException("Reclamation not found with ID: " + id);  // Si pas trouvée, lance une exception
        }
    }
}
