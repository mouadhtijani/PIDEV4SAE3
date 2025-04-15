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

    // ✅ POST: Add a response to a reclamation
    @PostMapping("/{reclamationId}")
    public ResponseEntity<?> addResponse(@PathVariable Long reclamationId, @RequestBody Map<String, String> payload) {
        try {
            String message = payload.get("message");
            Response response = responseService.addResponse(reclamationId, message);  // Calling the addResponse method from ResponseService
            return ResponseEntity.ok(response);  // Return the response with 200 OK
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());  // Return error with 400 Bad Request
        }
    }

    // ✅ GET: Get all responses
    @GetMapping
    public ResponseEntity<List<Response>> getAllResponses() {
        List<Response> responses = responseService.getAllResponses();  // Fetch all responses from the service
        return ResponseEntity.ok(responses);  // Return list of responses with 200 OK
    }

    // ✅ GET: Get response by reclamation ID
    @GetMapping("/reclamation/{reclamationId}")
    public ResponseEntity<?> getResponseByReclamation(@PathVariable Long reclamationId) {
        List<Response> responses = responseService.getByReclamationId(reclamationId);  // Get responses by reclamation ID
        if (responses.isEmpty()) {
            return ResponseEntity.notFound().build();  // Return 404 if no responses found
        }
        return ResponseEntity.ok(responses);  // Return responses if found
    }

    // ✅ PUT: Update a response
    @PutMapping("/{responseId}")
    public ResponseEntity<?> updateResponse(@PathVariable Long responseId, @RequestBody Map<String, String> payload) {
        try {
            String message = payload.get("message");
            Response updatedResponse = responseService.updateResponse(responseId, message);  // Call the update method from the service
            return ResponseEntity.ok(updatedResponse);  // Return updated response with 200 OK
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Update failed: " + e.getMessage());  // Return error with 400 Bad Request
        }
    }

    // ✅ DELETE: Delete a response
    @DeleteMapping("/{responseId}")
    public ResponseEntity<Void> deleteResponse(@PathVariable Long responseId) {
        try {
            responseService.deleteResponse(responseId);  // Call the delete method from the service
            return ResponseEntity.noContent().build();  // Return 204 No Content
        } catch (Exception e) {
            return ResponseEntity.status(400).build();  // Return 400 Bad Request if something goes wrong
        }
    }
}
