package com.esprit.company.service;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Student {
    private String name;
    private String major;
    private String cv;
    private String phoneNumber;
    private String email;
    private Integer age;
    private double gpa;
}
