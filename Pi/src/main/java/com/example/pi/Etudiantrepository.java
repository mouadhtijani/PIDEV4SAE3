package com.example.pi;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Etudiantrepository extends JpaRepository<Etudiant,Long> {
    List<Etudiant> findByNomContainingOrPrenomContainingOrEmailContaining(String nom, String prenom, String email);
    List<Etudiant> findBySupervisorId(Long supervisorId);
}
