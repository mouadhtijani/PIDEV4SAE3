package com.esprit.reclamation.controller;

import com.esprit.reclamation.entity.Response;
import com.esprit.reclamation.service.ResponseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/responses")
@CrossOrigin("*")
public class ResponseController {

    private final ResponseService responseService;

    public ResponseController(ResponseService responseService) {
        this.responseService = responseService;
    }

    // ✅ POST: Add response to a reclamation
    @PostMapping("/{reclamationId}")
    public ResponseEntity<?> addResponse(@PathVariable Long reclamationId, @RequestBody Map<String, String> payload) {
        try {
            String message = payload.get("message");
            Response response = responseService.addResponse(reclamationId, message);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ✅ GET: All responses
    @GetMapping
    public List<Response> getAllResponses() {
        return responseService.getAllResponses();
    }

    // ✅ GET: Response by Reclamation ID
    @GetMapping("/reclamation/{reclamationId}")
    public ResponseEntity<?> getResponseByReclamation(@PathVariable Long reclamationId) {
        return responseService.getByReclamationId(reclamationId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ PUT: Update response
    @PutMapping("/{responseId}")
    public ResponseEntity<?> updateResponse(@PathVariable Long responseId, @RequestBody Map<String, String> payload) {
        try {
            String message = payload.get("message");
            Response updated = responseService.updateResponse(responseId, message);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Update failed: " + e.getMessage());
        }
    }

    // ✅ DELETE: Delete response
    @DeleteMapping("/{responseId}")
    public ResponseEntity<Void> deleteResponse(@PathVariable Long responseId) {
        responseService.deleteResponse(responseId);
        return ResponseEntity.noContent().build();
    }
}
