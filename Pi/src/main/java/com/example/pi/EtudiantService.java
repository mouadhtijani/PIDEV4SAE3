package com.example.pi;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EtudiantService {

    private final Etudiantrepository etudiantRepository;

    public EtudiantService(Etudiantrepository etudiantRepository) {
        this.etudiantRepository = etudiantRepository;
    }

    public List<Etudiant> getAll() {
        return etudiantRepository.findAll();
    }

    public Etudiant getById(Long id) {
        return etudiantRepository.findById(id).orElseThrow(() -> new RuntimeException("Étudiant non trouvé"));
    }

    public Etudiant save(Etudiant etudiant) {
        return etudiantRepository.save(etudiant);
    }

    public Etudiant update(Long id, Etudiant etudiant) {
        Etudiant existing = getById(id);
        existing.setNom(etudiant.getNom());
        existing.setPrenom(etudiant.getPrenom());
        existing.setEmail(etudiant.getEmail());
        existing.setFiliere(etudiant.getFiliere());
        existing.setAnnee(etudiant.getAnnee());
        return etudiantRepository.save(existing);
    }

    public void delete(Long id) {
        etudiantRepository.deleteById(id);
    }
}

