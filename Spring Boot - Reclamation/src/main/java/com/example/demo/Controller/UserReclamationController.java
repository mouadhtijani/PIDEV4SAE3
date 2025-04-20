// src/main/java/com/example/demo/Controller/UserReclamationController.java
package com.example.demo.Controller;

import com.example.demo.Entity.Reclamation;
import com.example.demo.Service.ReclamationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/user/reclamations")
public class UserReclamationController {

    @Autowired
    private ReclamationService service;

    @PostMapping
    public Reclamation createReclamation(@RequestBody Reclamation reclamation) {
        return service.createReclamation(reclamation);
    }

    @GetMapping("/{userId}")
    public List<Reclamation> getByUser(@PathVariable String userId) {
        return service.getUserReclamations(userId);
    }
}