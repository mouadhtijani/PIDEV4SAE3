package com.example.projectWork.interfaces;

import com.example.projectWork.dto.CompanyRequest;
import com.example.projectWork.dto.CompanyResponse;
import com.example.projectWork.enums.CompanyStatus;
import com.example.projectWork.enums.Domaine;
import com.example.projectWork.models.Company;
import com.example.projectWork.models.User;
import jakarta.mail.MessagingException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.List;
public interface ICompanyServices {
    ResponseEntity<Company> addCompany(User supervisor, CompanyRequest request) throws MessagingException;

    Company findCompanyById(int idCompany);

    ResponseEntity<Company> setCompanyStatus(int idCompany, CompanyStatus companyStatus) throws MessagingException;

    List<CompanyResponse> getAllCompanyByStatus(CompanyStatus status);

    List<CompanyResponse> getAllCompanyByDomaine(Domaine domaine);

    ResponseEntity<Company> setCompany(int idCompany, CompanyRequest request);

    List<CompanyResponse> getAllCompany();

    Company findCompanyByName(String companyName);

    Company getCompanyByUser(int idUser);

    ResponseEntity<Company> addnewCompany(User supervisor, MultipartFile logo, String companyName, String address, Domaine domaine, String website, String companyEmail, int companyTel, int zipCode) throws IOException;
}
