package com.esprit.reclamation.repo;

import com.esprit.reclamation.entity.Reclamation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReclamationRepository extends JpaRepository<Reclamation, Long> {
    // Recherche les réclamations par type d'utilisateur
    List<Reclamation> findByTypeUser(String typeUser);

    // Recherche les réclamations par nom d'utilisateur
    List<Reclamation> findByNomUser(String nomUser);
}
