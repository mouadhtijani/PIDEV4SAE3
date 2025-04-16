package com.example.pi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.pi.Config.EmailService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/supervisors")
@CrossOrigin(origins = "http://localhost:4200")
public class SupervisorController {

    private final SupervisorService supervisorService;
    private final EmailService emailService; // ✅ injection propre via constructeur
    @Autowired
    private Etudiantrepository etudiantrepository;

    @Autowired
    public SupervisorController(SupervisorService supervisorService, EmailService emailService) {
        this.supervisorService = supervisorService;
        this.emailService = emailService;
    }

    // Get all supervisors
    @GetMapping
    public List<Supervisor> getAllSupervisors() {
        return supervisorService.listAllSupervisors();
    }

    // Get a supervisor by ID
    @GetMapping("/{id}")
    public Supervisor getSupervisorById(@PathVariable Long id) {
        return supervisorService.findSupervisorById(id).orElse(null);
    }

    // Create a new supervisor
    @PostMapping
    public Supervisor createSupervisor(@RequestBody Supervisor supervisor) {
        return supervisorService.addSupervisor(supervisor);
    }

    // Update an existing supervisor
    @PutMapping("/{id}")
    public Supervisor updateSupervisor(@PathVariable Long id, @RequestBody Supervisor supervisor) {
        return supervisorService.modifySupervisor(id, supervisor);
    }

    // Delete a supervisor
    @DeleteMapping("/{id}")
    public String deleteSupervisor(@PathVariable Long id) {
        if (supervisorService.removeSupervisor(id)) {
            return "Supervisor deleted successfully";
        }
        return "Supervisor not found";
    }

    // Get filtered students by supervisor ID
    @GetMapping("/{supervisorId}/students")
    public List<Etudiant> getFilteredStudents(
            @PathVariable Long supervisorId,
            @RequestParam(required = false, defaultValue = "") String nom,
            @RequestParam(required = false, defaultValue = "") String prenom,
            @RequestParam(required = false, defaultValue = "") String email) {
        return supervisorService.getFilteredEtudiants(nom, prenom, email);
    }

    // Assign a student to a supervisor and send email notifications to both
    @PostMapping("/{supervisorId}/assign/{etudiantId}")
    public Etudiant assignStudentToSupervisor(
            @PathVariable Long supervisorId,
            @PathVariable Long etudiantId) {
        // This method will now automatically send an email to both the student and the supervisor
        return supervisorService.assignStudentToSupervisor(supervisorId, etudiantId);
    }

    // Get all students supervised by a specific supervisor
    @GetMapping("/{supervisorId}/supervised-students")
    public List<Etudiant> getSupervisedStudents(@PathVariable Long supervisorId) {
        return supervisorService.getEtudiantsBySupervisor(supervisorId);
    }

    // Unassign a student from a supervisor
    @DeleteMapping("/{supervisorId}/unassign/{etudiantId}")
    public String unassignStudent(@PathVariable Long supervisorId, @PathVariable Long etudiantId) {
        boolean success = supervisorService.removeEtudiantFromSupervisor(supervisorId, etudiantId);
        return success ? "Etudiant unassigned successfully" : "Failed to unassign etudiant";
    }

    // Optional: Test sending an email manually
    // Optional: Test sending an email manually
    @GetMapping("/send-test-email")
    public String sendTestEmail() {
        String[] recipients = {"fadibenjemaa5@gmail.com"}; // Replace with the actual recipient email
        emailService.sendEmail(recipients, "Test Email Subject", "This is a test email.");
        return "Test email sent!";
    }


    // Add this endpoint to your existing SupervisorController or another controller for testing purposes
    @PostMapping("/send-test-email/{etudiantId}")
    public String sendTestEmail(@PathVariable Long etudiantId) {
        Optional<Etudiant> etudiantOpt = etudiantrepository.findById(etudiantId);

        if (etudiantOpt.isPresent()) {
            Etudiant etudiant = etudiantOpt.get();

            // Create the email content for the student
            String subject = "Test Email Subject";
            String body = "Hello " + etudiant.getNom() + " " + etudiant.getPrenom() + ",\n\nThis is a test email.";

            // Send email to the student using the emailService
            emailService.sendEmail(new String[]{etudiant.getEmail()}, subject, body);

            return "Test email sent to " + etudiant.getEmail();
        } else {
            return "Etudiant not found with ID: " + etudiantId;
        }
    }

}
