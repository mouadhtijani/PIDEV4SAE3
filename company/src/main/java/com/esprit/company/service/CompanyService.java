package com.esprit.company.service;

import com.esprit.company.client.StudentClient;
import com.esprit.company.entity.Company;
import com.esprit.company.repo.CompanyRepo;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Builder
public class CompanyService {

    @Autowired
    private CompanyRepo companyRepository;
    private StudentClient studentClient;

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

  /*  public FullCompanyResponse findCompaniesWithStudents(Long companyyId) {
        var company =companyRepository.findById(companyyId).orElse(
                Company.builder()
                        .name("NOT FOUND")
                        .build());
        var students = studentClient.findAllStudentsByCompany(companyyId);
        return FullCompanyResponse.builder()
                .name(company.getName())
                .students(students)
                .build();
    }*/
}
