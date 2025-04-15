package com.esprit.internship.controller;

import com.esprit.internship.entity.Internship;
import com.esprit.internship.service.InternshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/internships")
@CrossOrigin(origins = "http://localhost:4200")
public class InternshipController {
    @Autowired
    private InternshipService internshipService;

    @GetMapping
    public List<Internship> getAllInternships() {
        return internshipService.getAllInternships();
    }

    @GetMapping("/{internshipId}")
    public ResponseEntity<Internship> getInternshipById(@PathVariable Long internshipId) {
        Internship internship = internshipService.getInternshipById(internshipId);
        return internship != null ? ResponseEntity.ok(internship) : ResponseEntity.notFound().build();
    }

    @PostMapping("/add")
    public ResponseEntity<Internship> createInternship(@RequestBody Internship internship) {
        return ResponseEntity.ok(internshipService.createInternship(internship));
    }

    @DeleteMapping("/{internshipId}")
    public ResponseEntity<Void> deleteInternship(@PathVariable Long internshipId) {
        internshipService.deleteInternship(internshipId);
        return ResponseEntity.noContent().build();
    }
    // ✅ Add endpoint to get internships with feedback
    @GetMapping("/with-feedback")
    public ResponseEntity<List<Internship>> getAllInternshipsWithFeedback() {
        List<Internship> internships = internshipService.getAllInternshipsWithFeedback();
        return ResponseEntity.ok(internships);
    }
}
