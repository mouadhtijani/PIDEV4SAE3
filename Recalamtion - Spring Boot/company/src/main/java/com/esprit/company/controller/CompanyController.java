package com.esprit.company.controller;

import com.esprit.company.entity.Company;
import com.esprit.company.service.CompanyService;
import com.esprit.company.service.FullCompanyResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/companies")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @GetMapping
    public List<Company> getAllCompanies() {
        return companyService.getAllCompanies();
    }
  /*  @GetMapping("/with-students/{companyId}")
    public ResponseEntity<FullCompanyResponse>findAllCompanies(
            @PathVariable("companyId") Long companyyId
    ){return ResponseEntity.ok(companyService.findCompaniesWithStudents(companyyId));}*/
}
