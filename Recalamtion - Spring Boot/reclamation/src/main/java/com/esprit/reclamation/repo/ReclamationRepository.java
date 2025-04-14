package com.esprit.reclamation.repo;

import com.esprit.reclamation.entity.Reclamation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReclamationRepository extends JpaRepository<Reclamation, Long> {
    List<Reclamation> findByTypeUser(String typeUser);
    List<Reclamation> findByNomUser(String nomUser);
}
