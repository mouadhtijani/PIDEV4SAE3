package com.arbi.Internship;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/internships")
//@RequiredArgsConstructor

public class InternshipController {


    private final InternshipService internshipService;

    @Autowired
    public InternshipController(InternshipService internshipService) {
        this.internshipService = internshipService;
    }
    @PostMapping
    public ResponseEntity<Internship> addInternship(@RequestBody Internship internship) {
        internshipService.addInternship(internship);
        return ResponseEntity.ok(internship);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeInternship(@PathVariable Long id) {
        internshipService.removeInternship(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Internship>> retrieveInternships() {
        List<Internship> internships = internshipService.retrieveInternships();
        return ResponseEntity.ok(internships);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Internship> updateInternship(@PathVariable Long id, @RequestBody Internship internshipDetails) {
        Internship updatedInternship = internshipService.updateInternship(id, internshipDetails);
        return ResponseEntity.ok(updatedInternship);
    }

    @GetMapping("/search")
    @Operation(summary = "Search internships", description = "Search internships with filters")
    public ResponseEntity<List<Internship>> searchInternships(
            @Parameter(description = "Title filter") @RequestParam(required = false) String title,
            @Parameter(description = "Company filter") @RequestParam(required = false) String company,
            @Parameter(description = "Location filter") @RequestParam(required = false) String location,
            @Parameter(hidden = true) @RequestParam Map<String, String> allParams
    ) {
        // Remove standard parameters from allParams
        Map<String, String> additionalParams = new HashMap<>(allParams);
        additionalParams.remove("title");
        additionalParams.remove("company");
        additionalParams.remove("location");

        return ResponseEntity.ok(internshipService.searchInternships(title, company, location, additionalParams));
    }


}