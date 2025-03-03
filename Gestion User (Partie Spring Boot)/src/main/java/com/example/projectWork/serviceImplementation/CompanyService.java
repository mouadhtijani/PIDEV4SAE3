package com.example.projectWork.serviceImplementation;
import com.example.projectWork.Repository.CompanyRepository;
import com.example.projectWork.Repository.UserRepository;
import com.example.projectWork.dto.CompanyRequest;
import com.example.projectWork.dto.CompanyResponse;
import com.example.projectWork.email.EmailService;
import com.example.projectWork.email.EmailTemplateName;
import com.example.projectWork.enums.CompanyStatus;
import com.example.projectWork.enums.Domaine;
import com.example.projectWork.interfaces.ICompanyServices;
import com.example.projectWork.models.Company;
import com.example.projectWork.models.User;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.SecureRandom;
import java.util.List;


@Service
@RequiredArgsConstructor
public class CompanyService implements ICompanyServices {
    private static final String activationCompanyUrl = "http://localhost:4200/activate-company";
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    @Override
    public ResponseEntity<Company> addCompany(User supervisor, CompanyRequest request)   {
        if(request==null){
            return new ResponseEntity<>( HttpStatus.NO_CONTENT);
        }
        Company company = Company
                .builder()
                .companyName(request.getCompanyName())
                .supervisor(supervisor)
                .address(request.getAddress())
                .domaine(request.getDomaine())
                .webSite(request.getWebSite())
                .ZipCode(request.getZipCode())
                .company_logo(request.getCompanyLogo())
                .companyEmail(request.getCompanyEmail())
                .companyTelephone(request.getCompanyTelephone())
                .companyStatus(CompanyStatus.PENDING)
                .build();
        companyRepository.save(company);
        return new ResponseEntity<>(company, HttpStatus.OK);
    }

    @Override
    public Company  findCompanyById(int idCompany) {

        return companyRepository.findById(idCompany).orElseThrow(()->new RuntimeException("Company NOT FOUND"));
    }

    @Override
    public ResponseEntity<Company> setCompanyStatus(int idCompany, CompanyStatus companyStatus) throws MessagingException {
        int companyCode;
        Company company = companyRepository.findById(idCompany).orElseThrow(()->new RuntimeException("Company NOT FOUND"));
        if(companyStatus.equals(CompanyStatus.ACCEPTED)){
            companyCode=Integer.parseInt(generateActivationCode(4)) ;
            company.setCompanyStatus(companyStatus);
            company.setCompanyPrintCode(companyCode);
            companyRepository.save(company);
            emailService.sendCompanyCodeEmail(company.getSupervisor().getEmail(), company.getSupervisor().fullName(), EmailTemplateName.CODE_COMPANY, String.valueOf(companyCode),"Company Activation");
            return new ResponseEntity<>(company,HttpStatus.ACCEPTED);
        }else{
            company.setCompanyStatus(companyStatus);
            companyRepository.save(company);
            return new ResponseEntity<>(company,HttpStatus.NOT_ACCEPTABLE);
        }
    }
    @Override
    public List<CompanyResponse> getAllCompanyByStatus(CompanyStatus status) {
        List<Company> companyList = companyRepository.findAllByCompanyStatus(status);
        return companyList.stream().map(this::mapToCompanyResponse).toList();
    }

    @Override
    public List<CompanyResponse> getAllCompanyByDomaine(Domaine domaine) {
        List<Company> companyList = companyRepository.findAllByDomaine(domaine);
        return companyList.stream().map(this::mapToCompanyResponse).toList();

    }

    @Override
    public ResponseEntity<Company> setCompany(int idCompany, CompanyRequest request) {
        User supervisor= userRepository.findById(request.getSupervisorId()).orElseThrow(()->new RuntimeException("SuperVisor NOT FOUND"));
        Company company = companyRepository.findById(idCompany).orElseThrow(()->new RuntimeException("Company NOT FOUND"));
        if(company.getSupervisor().equals(supervisor)){
            company.setCompanyEmail(request.getCompanyEmail());
            company.setCompanyName(request.getCompanyName());
            company.setWebSite(request.getWebSite());
            company.setCompanyTelephone(request.getCompanyTelephone());
            company.setAddress(request.getAddress());
            company.setDomaine(request.getDomaine());
            companyRepository.save(company);
            return new ResponseEntity<>(company,HttpStatus.OK);

        }else{
            throw new RuntimeException("you have not the permssion to update this company  ");
        }
    }

    @Override
    public List<CompanyResponse> getAllCompany() {

        List<Company> companyList = companyRepository.findAll();
        return companyList.stream().map(this::mapToCompanyResponse).toList();    }

    @Override
    public Company findCompanyByName(String companyName) {
        return companyRepository.findByCompanyName(companyName);
    }

    @Override
    public Company getCompanyByUser(int idUser) {
        User user= userRepository.findById(idUser).orElseThrow(()->new RuntimeException("User NOT FOUND"));
    return companyRepository.findBySupervisor(user);
    }

    @Override
    public ResponseEntity<Company> addnewCompany(User supervisor, MultipartFile logo, String companyName, String address, Domaine domaine, String website, String companyEmail, int companyTel, int zipCode) throws IOException {
        Company company = Company
                .builder()
                .supervisor(supervisor)
                .company_logo(logo.getBytes())
                .ZipCode(zipCode)
                .companyTelephone(companyTel)
                .webSite(website)
                .address(address)
                .companyStatus(CompanyStatus.PENDING)
                .companyName(companyName)
                .domaine(domaine)
                .companyEmail(companyEmail)
                .build();
        companyRepository.save(company);
        return new ResponseEntity<>(company, HttpStatus.OK);

    }

    private CompanyResponse mapToCompanyResponse(Company company) {
        return CompanyResponse
                .builder()
                .CompanyId(company.getCompanyId())
                .companyName(company.getCompanyName())
                .companyEmail(company.getCompanyEmail())
                .companyTelephone(company.getCompanyTelephone())
                .address(company.getAddress())
                .webSite(company.getWebSite())
                .domaine(company.getDomaine())
                .supervisor(company.getSupervisor())
                .companyStatus(company.getCompanyStatus())
                .build();
    }

    private String generateActivationCode(int length) {
        String characters="0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();
        for (int i=0;i<length;i++){
            int randomIndex=secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }
        return codeBuilder.toString();
    }

}
