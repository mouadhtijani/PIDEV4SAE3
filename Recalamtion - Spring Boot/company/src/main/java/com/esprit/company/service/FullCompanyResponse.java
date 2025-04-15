package com.esprit.company.service;

import lombok.*;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FullCompanyResponse {
    private String industry;
    private String name;
    private String description;
    private String contactEmail;
    private String contactPhone;
    List<Student> students;
}
