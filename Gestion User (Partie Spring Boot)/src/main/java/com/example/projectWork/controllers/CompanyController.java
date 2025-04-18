package com.example.projectWork.controllers;


import com.example.projectWork.dto.CompanyRequest;
import com.example.projectWork.dto.CompanyResponse;
import com.example.projectWork.enums.CompanyStatus;
import com.example.projectWork.enums.Domaine;
import com.example.projectWork.enums.Role;
import com.example.projectWork.enums.RoleClass;
import com.example.projectWork.interfaces.ICompanyServices;
import com.example.projectWork.interfaces.IUserService;
import com.example.projectWork.models.Company;
import com.example.projectWork.models.User;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@RestController
@RequestMapping("/api/v1/company")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CompanyController {
    private final IUserService iUserService;
    private final ICompanyServices iCompanyServices;
    @PostMapping("/Create")
    public ResponseEntity<Company> addCompany(@RequestParam("logo") MultipartFile logo,@RequestParam("supervisorID") int supervisorID,@RequestParam("companyName")String companyName,@RequestParam("address") String address,@RequestParam("domaine") Domaine domaine,@RequestParam("website") String website,@RequestParam("companyEmail") String companyEmail,@RequestParam("companyTel")int companyTel,@RequestParam("zipCode")int zipCode) throws MessagingException, IOException {
        User supervisor = iUserService.findUserById(supervisorID).orElseThrow(()-> new RuntimeException("SuperVisor NOT found"));
        return iCompanyServices.addnewCompany(supervisor,logo,companyName,address,domaine,website,companyEmail,companyTel,zipCode);
    }


    // has role supervisor
  /*  @PostMapping("/Createe")
    @PreAuthorize("hasAnyAuthority(\"" +  RoleClass.SUPERVISOR + "\")")
    public ResponseEntity<Company> addCompanySuperV(@RequestBody  CompanyRequest request) throws MessagingException {
        User supervisor = iUserService.findUserById(request.getSupervisorId()).orElseThrow(()-> new RuntimeException("SuperVisor NOT found"));
        return iCompanyServices.addCompany(supervisor,request);
    }*/
    @GetMapping("/{id_company}")
    public Company getCompanyById(@PathVariable int id_company){
        return iCompanyServices.findCompanyById(id_company);
    }
    @GetMapping("/name/{companyName}")
    public Company getCompanyByName(@PathVariable String companyName){
        return iCompanyServices.findCompanyByName(companyName);
    }

    @GetMapping("/status")
    public List<CompanyResponse> getAllCompanyByStatus(@RequestParam("status") CompanyStatus status){
        return iCompanyServices.getAllCompanyByStatus(status);
    }
    @PutMapping("/set-status/{id_company}")
    public ResponseEntity<Company> setCompanyStatus(@PathVariable int id_company, @RequestParam("newStatus")CompanyStatus companyStatus) throws MessagingException {
        return iCompanyServices.setCompanyStatus(id_company,companyStatus);
    }
    @PutMapping("/set-company/{id_company}")
    public ResponseEntity<Company> setCompany(@PathVariable int id_company, @RequestBody  CompanyRequest request )  {
        return iCompanyServices.setCompany(id_company,request);
    }
    @GetMapping("/domaine")
    public List<CompanyResponse> getAllCompanyByDomaine(@RequestParam("domaine")Domaine domaine){
        return iCompanyServices.getAllCompanyByDomaine(domaine);
    }
    @GetMapping()
    public List<CompanyResponse> getAllCompany(){
        return iCompanyServices.getAllCompany();
    }

    @GetMapping("/user/{id_user}")
    public Company getCompanyByUser(@PathVariable int id_user){

        return iCompanyServices.getCompanyByUser(id_user);
    }




}
