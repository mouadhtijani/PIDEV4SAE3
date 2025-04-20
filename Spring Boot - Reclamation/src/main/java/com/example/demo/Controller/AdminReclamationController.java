// src/main/java/com/example/demo/Controller/AdminReclamationController.java
package com.example.demo.Controller;

import com.example.demo.Entity.Reclamation;
import com.example.demo.Service.ReclamationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/admin/reclamations")
public class AdminReclamationController {

    @Autowired
    private ReclamationService service;

    @GetMapping
    public List<Reclamation> getAllReclamations() {
        return service.getAllReclamations();
    }

    @PutMapping("/{id}/response")
    public Reclamation updateResponse(
            @PathVariable Long id,
            @RequestBody    Map<String, String> request) { // Utiliser une Map ou DTO

        String adminResponse = request.get("response");
        return service.updateAdminResponse(id, adminResponse);
    }
}