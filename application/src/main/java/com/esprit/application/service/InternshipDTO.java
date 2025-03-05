package com.esprit.application.service;

import lombok.Data;

@Data
public class InternshipDTO {
    private Long internshipId;
    private String title;
    private String description;
    private String location;
    private String company;
    private String deadline;
    private String internshipType; // SUMMER or PFE
    private String internshipStatus; // OPEN or CLOSED

}