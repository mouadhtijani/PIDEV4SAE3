package com.esprit.application.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "internship-service")
public interface InternshipClient {
    @GetMapping("/api/internships/{internshipId}")
    InternshipDTO getInternshipById(@PathVariable Long internshipId);
}
