package com.esprit.feedback.controller;

import com.esprit.feedback.entity.Feedback;
import com.esprit.feedback.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedbacks")
@CrossOrigin(origins = "http://localhost:4200") // Adjust if needed
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    // ✅ Get feedback by internshipId
    @GetMapping("/internship/{internshipId}")
    public ResponseEntity<List<Feedback>> getFeedbackByInternshipId(@PathVariable Long internshipId) {
        return ResponseEntity.ok(feedbackService.getFeedbackByInternshipId(internshipId));
    }

    // ✅ Add new feedback
    @PostMapping("/add")
    public ResponseEntity<Feedback> addFeedback(@RequestBody Feedback feedback) {
        return ResponseEntity.ok(feedbackService.addFeedback(feedback));
    }
}