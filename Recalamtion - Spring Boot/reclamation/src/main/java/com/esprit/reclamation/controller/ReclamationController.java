package com.esprit.reclamation.controller;

import com.esprit.reclamation.entity.Reclamation;
import com.esprit.reclamation.service.ReclamationService;
import org.springframework.web.bind.annotation.*;
import com.esprit.reclamation.controller.ResponseController;
import java.util.List;

@RestController
@RequestMapping("/api/reclamations")
@CrossOrigin("*")
public class ReclamationController {

    private final ReclamationService service;

    public ReclamationController(ReclamationService service) {
        this.service = service;
    }

    @PostMapping
    public Reclamation save(@RequestBody Reclamation r) {
        return service.create(r);
    }

    @GetMapping
    public List<Reclamation> getAll() {
        return service.getAll();
    }

    @GetMapping("/type/{typeUser}")
    public List<Reclamation> byType(@PathVariable String typeUser) {
        return service.getByUserType(typeUser);
    }

    @GetMapping("/user/{nomUser}")
    public List<Reclamation> byUser(@PathVariable String nomUser) {
        return service.getByNomUser(nomUser);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
