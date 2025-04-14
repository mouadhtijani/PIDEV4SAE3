package com.esprit.feedback.service;

import com.esprit.feedback.entity.Feedback;
import com.esprit.feedback.repo.FeedbackRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepo feedbackRepository;


    public Feedback addFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getFeedbackByInternshipId(Long internshipId) {
        return feedbackRepository.findByInternshipId(internshipId);
    }
}