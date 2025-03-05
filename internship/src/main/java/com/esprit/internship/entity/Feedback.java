package com.esprit.internship.entity;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Feedback {
    private Long feedbackId;
    private Long internshipId;
    private Float rating;
    private String comment;



}