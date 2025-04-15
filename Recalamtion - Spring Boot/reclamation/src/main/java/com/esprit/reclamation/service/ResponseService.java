package com.esprit.reclamation.service;

import com.esprit.reclamation.entity.Reclamation;
import com.esprit.reclamation.entity.Response;
import com.esprit.reclamation.repo.ReclamationRepository;  // Import this repository
import com.esprit.reclamation.repo.ResponseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ResponseService {

    private final ResponseRepository responseRepository;
    private final ReclamationRepository reclamationRepository;  // Inject ReclamationRepository

    public ResponseService(ResponseRepository responseRepository, ReclamationRepository reclamationRepository) {
        this.responseRepository = responseRepository;
        this.reclamationRepository = reclamationRepository;  // Initialize ReclamationRepository
    }

    // ✅ Add a response to a reclamation
    public Response addResponse(Long reclamationId, String message) {
        // Find the reclamation by its ID
        Optional<Reclamation> reclamationOptional = reclamationRepository.findById(reclamationId); // Use ReclamationRepository here
        if (reclamationOptional.isEmpty()) {
            throw new IllegalArgumentException("Reclamation not found with ID " + reclamationId);
        }

        Reclamation reclamation = reclamationOptional.get();

        // Create and set up the response
        Response response = new Response();
        response.setMessage(message);
        response.setReclamation(reclamation);
        response.setResponseDate(LocalDate.now());  // Add current date as response date

        // Save and return the response
        return responseRepository.save(response);
    }

    // ✅ Get all responses
    public List<Response> getAllResponses() {
        return responseRepository.findAll(); // Return all responses
    }

    // ✅ Get responses by reclamation ID
    public List<Response> getByReclamationId(Long reclamationId) {
        return responseRepository.findByReclamationId(reclamationId);  // This fetches all responses related to the reclamation
    }

    // ✅ Update a response
    public Response updateResponse(Long responseId, String message) {
        Response response = responseRepository.findById(responseId)
                .orElseThrow(() -> new IllegalArgumentException("Response not found with ID " + responseId));

        // Update the response message
        response.setMessage(message);
        return responseRepository.save(response);  // Save and return the updated response
    }

    // ✅ Delete a response
    public void deleteResponse(Long responseId) {
        if (!responseRepository.existsById(responseId)) {
            throw new IllegalArgumentException("Response not found with ID " + responseId);
        }
        responseRepository.deleteById(responseId);  // Delete the response from the repository
    }
}
