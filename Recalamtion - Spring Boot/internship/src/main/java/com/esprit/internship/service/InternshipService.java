package com.esprit.internship.service;

import com.esprit.feedback.entity.Feedback;
import com.esprit.internship.entity.Internship;
import com.esprit.internship.repo.InternshipRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InternshipService {
    @Autowired
    private InternshipRepo internshipRepo;
    @Autowired
    private FeedbackClient feedbackClient; // Inject Feign Client

    public List<Internship> getAllInternships() {
        return internshipRepo.findAll();
    }

    public Internship getInternshipById(Long internshipId) {
        return internshipRepo.findById(internshipId).orElse(null);
    }

    public Internship createInternship(Internship internship) {
        return internshipRepo.save(internship);
    }

    public void deleteInternship(Long internshipId) {
        internshipRepo.deleteById(internshipId);
    }

    public List<Internship> getAllInternshipsWithFeedback() {
        List<Internship> internships = internshipRepo.findAll();

        for (Internship internship : internships) {
            List<Feedback> feedbacks = feedbackClient.getFeedbackByInternshipId(internship.getInternshipId());

            System.out.println("Fetching feedback for internship ID: " + internship.getInternshipId());
            System.out.println("Feedback received: " + feedbacks);

            internship.setFeedbackList(feedbacks); // Ensure this is setting properly
        }

        return internships;
    }

}
