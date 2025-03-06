package com.arbi.Internship;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.persistence.criteria.Predicate;
import java.util.*;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor

public class InternshipService {
    @Autowired
    private InternshipRepository internshipRepository;


    public void addInternship(Internship internship) {
        internshipRepository.save(internship);
    }

    public void removeInternship(Long id) {
        internshipRepository.deleteById(id);
    }

    public List<Internship> retrieveInternships() {
        return internshipRepository.findAll();
    }

    public Internship updateInternship(Long id, Internship internshipDetails) {
        return internshipRepository.findById(id).map(internship -> {
            internship.setTitle(internshipDetails.getTitle());
            internship.setCompany(internshipDetails.getCompany());
            internship.setLocation(internshipDetails.getLocation());
            internship.setStartDate(internshipDetails.getStartDate());
            internship.setEndDate(internshipDetails.getEndDate());
            internship.setDescription(internshipDetails.getDescription());
            return internshipRepository.save(internship);
        }).orElseThrow(() -> new RuntimeException("Internship not found with id " + id));
    }

    public List<Internship> searchInternships(String title, String company, String location, Map<String, String> additionalCriteria) {
        return internshipRepository.findAll((root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Handle standard fields
            if (title != null && !title.isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("title")), "%" + title.toLowerCase() + "%"));
            }
            if (company != null && !company.isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("company")), "%" + company.toLowerCase() + "%"));
            }
            if (location != null && !location.isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("location")), "%" + location.toLowerCase() + "%"));
            }

            // Handle additional criteria
            if (additionalCriteria != null) {
                Set<String> validFields = Set.of("startDate", "endDate", "description"); // add your valid fields here
                additionalCriteria.forEach((key, value) -> {
                    if (value != null && !value.isEmpty() && validFields.contains(key)) {
                        predicates.add(cb.like(cb.lower(root.get(key)), "%" + value.toLowerCase() + "%"));
                    }
                });
            }

            return predicates.isEmpty() ? cb.conjunction() : cb.and(predicates.toArray(new Predicate[0]));
        });
    }


}

