package com.esprit.reclamation.service;

import com.esprit.reclamation.entity.Reclamation;
import com.esprit.reclamation.entity.Response;
import com.esprit.reclamation.repo.ReclamationRepository;
import com.esprit.reclamation.repo.ResponseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ResponseService {

    private final ResponseRepository responseRepository;
    private final ReclamationRepository reclamationRepository;

    public ResponseService(ResponseRepository responseRepository, ReclamationRepository reclamationRepository) {
        this.responseRepository = responseRepository;
        this.reclamationRepository = reclamationRepository;
    }

    // ✅ Ajouter une réponse à une réclamation
    public Response addResponse(Long reclamationId, String message) {
        Optional<Reclamation> optionalReclamation = reclamationRepository.findById(reclamationId);
        if (optionalReclamation.isEmpty()) {
            throw new IllegalArgumentException("Reclamation not found with ID " + reclamationId);
        }

        Reclamation reclamation = optionalReclamation.get();

        if (reclamation.getResponse() != null) {
            throw new IllegalStateException("This reclamation already has a response.");
        }

        Response response = new Response();
        response.setMessage(message);
        response.setResponseDate(LocalDate.now());
        response.setReclamation(reclamation);

        return responseRepository.save(response);
    }

    // ✅ Récupérer toutes les réponses
    public List<Response> getAllResponses() {
        return responseRepository.findAll();
    }

    // ✅ Récupérer une réponse par ID de réclamation
    public Optional<Response> getByReclamationId(Long reclamationId) {
        return responseRepository.findByReclamationId(reclamationId);
    }

    // ✅ Mettre à jour une réponse
    public Response updateResponse(Long responseId, String message) {
        Response response = responseRepository.findById(responseId)
                .orElseThrow(() -> new IllegalArgumentException("Response not found with ID " + responseId));
        response.setMessage(message);
        return responseRepository.save(response);
    }

    // ✅ Supprimer une réponse
    public void deleteResponse(Long responseId) {
        if (!responseRepository.existsById(responseId)) {
            throw new IllegalArgumentException("Response not found with ID " + responseId);
        }
        responseRepository.deleteById(responseId);
    }
}
