package com.example.demo.Controller;

import com.example.demo.Entity.Reclamation;
import com.example.demo.Service.ReclamationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.util.List;
import java.util.Map;

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

    @PutMapping("/{id}/response")
    public Reclamation updateResponse(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        String adminResponse = request.get("response");
        return service.updateAdminResponse(id, adminResponse);
    }

    @GetMapping("/{userId}")
    public List<Reclamation> getByUser(@PathVariable String userId) {
        return service.getUserReclamations(userId);
    }

    // Ajout de l'endpoint pour récupérer le QR code
    @GetMapping("/qr/{reclamationId}")
    public ResponseEntity<ByteArrayResource> getQRCode(@PathVariable String reclamationId) throws IOException {
        byte[] qrCodeData = service.getQRCodeData(reclamationId);

        if (qrCodeData == null) {
            return ResponseEntity.notFound().build(); // QR code does not exist
        }

        ByteArrayResource resource = new ByteArrayResource(qrCodeData);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(resource);
    }
}
