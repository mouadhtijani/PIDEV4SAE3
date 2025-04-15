package com.example.pi;

import com.example.pi.Config.EmailService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SupervisorService {

    private final SupervisorRepository supervisorRepository;
    private final Etudiantrepository etudiantrepository;

    @Autowired
    private EmailService emailService; // Inject the EmailService to send emails

    @Autowired
    public SupervisorService(SupervisorRepository supervisorRepository, Etudiantrepository etudiantrepository) {
        this.supervisorRepository = supervisorRepository;
        this.etudiantrepository = etudiantrepository;
    }

    // Get filtered students by name, surname or email
    public List<Etudiant> getFilteredEtudiants(String nom, String prenom, String email) {
        return etudiantrepository.findByNomContainingOrPrenomContainingOrEmailContaining(nom, prenom, email);
    }

    // Assign a student to a supervisor and send emails
    public Etudiant assignStudentToSupervisor(Long supervisorId, Long etudiantId) {
        Optional<Supervisor> supervisorOpt = supervisorRepository.findById(supervisorId);
        Optional<Etudiant> etudiantOpt = etudiantrepository.findById(etudiantId);

        // Check if both supervisor and student exist
        if (supervisorOpt.isPresent() && etudiantOpt.isPresent()) {
            Etudiant etudiant = etudiantOpt.get();
            Supervisor supervisor = supervisorOpt.get();

            // Assign the supervisor to the student
            etudiant.setSupervisor(supervisor);
            Etudiant updatedEtudiant = etudiantrepository.save(etudiant); // Save the updated student

            // Sending email to the student
            String messageToStudent = "Bonjour " + etudiant.getNom() + ",\n\n" +
                    "Vous avez été affecté au superviseur " + supervisor.getName() + ".\n" +
                    "Veuillez contacter votre superviseur pour les prochaines étapes.";
            emailService.sendEmail(etudiant.getEmail(), "Affectation à un superviseur", messageToStudent);

            // Sending email to the supervisor
            String messageToSupervisor = "Bonjour " + supervisor.getName() + ",\n\n" +
                    "L'étudiant " + etudiant.getNom() + " (" + etudiant.getEmail() + ") vient d’être affecté à vous.";
            emailService.sendEmail(supervisor.getEmail(), "Nouvel étudiant assigné", messageToSupervisor);

            // Return the updated student
            return updatedEtudiant;
        } else {
            throw new RuntimeException("Supervisor or Etudiant not found");
        }
    }

    // Get students supervised by a specific supervisor
    public List<Etudiant> getEtudiantsBySupervisor(Long supervisorId) {
        return etudiantrepository.findBySupervisorId(supervisorId);
    }

    // Remove student from supervisor
    public boolean removeEtudiantFromSupervisor(Long supervisorId, Long etudiantId) {
        Optional<Etudiant> etudiantOpt = etudiantrepository.findById(etudiantId);
        if (etudiantOpt.isPresent()) {
            Etudiant etudiant = etudiantOpt.get();
            if (etudiant.getSupervisor() != null && etudiant.getSupervisor().getId().equals(supervisorId)) {
                etudiant.setSupervisor(null);
                etudiantrepository.save(etudiant);
                return true;
            }
        }
        return false;
    }

    // Add a new supervisor
    public Supervisor addSupervisor(Supervisor supervisor) {
        return supervisorRepository.save(supervisor);
    }

    // Find a supervisor by ID
    public Optional<Supervisor> findSupervisorById(Long id) {
        return supervisorRepository.findById(id);
    }

    // List all supervisors
    public List<Supervisor> listAllSupervisors() {
        return supervisorRepository.findAll();
    }

    // Modify an existing supervisor
    public Supervisor modifySupervisor(Long id, Supervisor updatedSupervisor) {
        return supervisorRepository.findById(id).map(supervisor -> {
            supervisor.setName(updatedSupervisor.getName());
            supervisor.setEmail(updatedSupervisor.getEmail());
            return supervisorRepository.save(supervisor);
        }).orElseThrow(() -> new RuntimeException("Supervisor not found"));
    }

    // Remove a supervisor by ID
    public boolean removeSupervisor(Long id) {
        if (supervisorRepository.existsById(id)) {
            supervisorRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
