package com.esprit.internship.service;

import com.esprit.feedback.entity.Feedback;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;

// Feign client to call Feedback Microservice
@FeignClient(name = "feedbacks", url = "http://localhost:8085") // Adjust if using Eureka
public interface FeedbackClient {

    @GetMapping("/feedbacks/internship/{internshipId}")
    List<Feedback> getFeedbackByInternshipId(@PathVariable Long internshipId);
}
