package com.esprit.reclamation.controller;

import com.esprit.reclamation.entity.Reclamation;
import com.esprit.reclamation.service.ReclamationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reclamations")
@CrossOrigin("*")
public class ReclamationController {

    private final ReclamationService service;

    public ReclamationController(ReclamationService service) {
        this.service = service;
    }

    // ✅ POST: Créer une nouvelle réclamation
    @PostMapping
    public ResponseEntity<Reclamation> save(@RequestBody Reclamation r) {
        Reclamation savedReclamation = service.create(r);
        return new ResponseEntity<>(savedReclamation, HttpStatus.CREATED);  // Retourne 201 en cas de création
    }

    // ✅ GET: Obtenir toutes les réclamations
    @GetMapping
    public ResponseEntity<List<Reclamation>> getAll() {
        List<Reclamation> reclamations = service.getAll();
        if (reclamations.isEmpty()) {
            return ResponseEntity.noContent().build();  // Retourne 204 si aucune réclamation trouvée
        }
        return ResponseEntity.ok(reclamations);  // Retourne 200 avec les réclamations
    }

    // ✅ GET: Obtenir les réclamations par type d'utilisateur
    @GetMapping("/type/{typeUser}")
    public ResponseEntity<List<Reclamation>> byType(@PathVariable String typeUser) {
        List<Reclamation> reclamations = service.getByUserType(typeUser);
        return ResponseEntity.ok(reclamations);  // Retourne les réclamations par type
    }

    // ✅ GET: Obtenir les réclamations par nom d'utilisateur
    @GetMapping("/user/{nomUser}")
    public ResponseEntity<List<Reclamation>> byUser(@PathVariable String nomUser) {
        List<Reclamation> reclamations = service.getByNomUser(nomUser);
        return ResponseEntity.ok(reclamations);  // Retourne les réclamations par nom d'utilisateur
    }

    // ✅ DELETE: Supprimer une réclamation par ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            service.delete(id);
            return ResponseEntity.noContent().build();  // Retourne 204 si suppression réussie
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();  // Retourne 404 si réclamation non trouvée
        }
    }
}
