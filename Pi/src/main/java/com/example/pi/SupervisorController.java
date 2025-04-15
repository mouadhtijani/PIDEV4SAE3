package com.example.pi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.pi.Config.EmailService;

import java.util.List;

@RestController
@RequestMapping("/supervisors")
@CrossOrigin(origins = "http://localhost:4200")
public class SupervisorController {

    private final SupervisorService supervisorService;
    private final EmailService emailService; // ✅ injection propre via constructeur

    @Autowired
    public SupervisorController(SupervisorService supervisorService, EmailService emailService) {
        this.supervisorService = supervisorService;
        this.emailService = emailService;
    }

    @GetMapping
    public List<Supervisor> getAllSupervisors() {
        return supervisorService.listAllSupervisors();
    }

    @GetMapping("/{id}")
    public Supervisor getSupervisorById(@PathVariable Long id) {
        return supervisorService.findSupervisorById(id).orElse(null);
    }

    @PostMapping
    public Supervisor createSupervisor(@RequestBody Supervisor supervisor) {
        return supervisorService.addSupervisor(supervisor);
    }

    @PutMapping("/{id}")
    public Supervisor updateSupervisor(@PathVariable Long id, @RequestBody Supervisor supervisor) {
        return supervisorService.modifySupervisor(id, supervisor);
    }

    @DeleteMapping("/{id}")
    public String deleteSupervisor(@PathVariable Long id) {
        if (supervisorService.removeSupervisor(id)) {
            return "Supervisor deleted successfully";
        }
        return "Supervisor not found";
    }

    @GetMapping("/{supervisorId}/students")
    public List<Etudiant> getFilteredStudents(
            @PathVariable Long supervisorId,
            @RequestParam(required = false, defaultValue = "") String nom,
            @RequestParam(required = false, defaultValue = "") String prenom,
            @RequestParam(required = false, defaultValue = "") String email) {
        return supervisorService.getFilteredEtudiants(nom, prenom, email);
    }

    @PostMapping("/{supervisorId}/assign/{etudiantId}")
    public Etudiant assignStudentToSupervisor(
            @PathVariable Long supervisorId,
            @PathVariable Long etudiantId) {
        return supervisorService.assignStudentToSupervisor(supervisorId, etudiantId);
    }

    @GetMapping("/{supervisorId}/supervised-students")
    public List<Etudiant> getSupervisedStudents(@PathVariable Long supervisorId) {
        return supervisorService.getEtudiantsBySupervisor(supervisorId);
    }

    @DeleteMapping("/{supervisorId}/unassign/{etudiantId}")
    public String unassignStudent(@PathVariable Long supervisorId, @PathVariable Long etudiantId) {
        boolean success = supervisorService.removeEtudiantFromSupervisor(supervisorId, etudiantId);
        return success ? "Etudiant unassigned successfully" : "Failed to unassign etudiant";
    }

    // ✅ Test d’envoi d’email manuel (optionnel)
    @GetMapping("/test-email")
    public String testEmail() {
        emailService.sendEmail("destinataire@gmail.com", "Test d'envoi", "Ceci est un test");
        return "Email envoyé !";
    }
}
