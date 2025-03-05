package com.esprit.company.client;

import com.esprit.company.service.Student;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name="student-service",url = "${application.config.students-url}")
public interface StudentClient {
    @GetMapping("/company/{companyId}")
    List<Student> findAllStudentsByCompany(@PathVariable("companyId") Long companyyId);
}
