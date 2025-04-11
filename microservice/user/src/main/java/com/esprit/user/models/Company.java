package com.esprit.user.models;

import com.esprit.user.enums.CompanyStatus;
import com.esprit.user.enums.Domaine;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;


@Entity
@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Company implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int companyId;
    private String companyName;
    private String address;
    @Enumerated(EnumType.STRING)
    private Domaine domaine;
    @Column(nullable = true,name = "CodeCompany")
    private int companyPrintCode;
    private String companyEmail;
    private int companyTelephone;
    private int ZipCode;
    @Lob
    @Column(name = "company_logo",length = 10000000 ,nullable = true)
    private byte[] company_logo;
    @Enumerated(EnumType.STRING)
    private CompanyStatus companyStatus;
    private String webSite;
    @OneToOne
    private User supervisor;

    public int getCompanyId() {
        return companyId;
    }

    public void setCompanyId(int companyId) {
        this.companyId = companyId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Domaine getDomaine() {
        return domaine;
    }

    public void setDomaine(Domaine domaine) {
        this.domaine = domaine;
    }

    public int getCompanyPrintCode() {
        return companyPrintCode;
    }

    public void setCompanyPrintCode(int companyPrintCode) {
        this.companyPrintCode = companyPrintCode;
    }

    public String getCompanyEmail() {
        return companyEmail;
    }

    public void setCompanyEmail(String companyEmail) {
        this.companyEmail = companyEmail;
    }

    public int getCompanyTelephone() {
        return companyTelephone;
    }

    public void setCompanyTelephone(int companyTelephone) {
        this.companyTelephone = companyTelephone;
    }

    public int getZipCode() {
        return ZipCode;
    }

    public void setZipCode(int zipCode) {
        ZipCode = zipCode;
    }

    public byte[] getCompany_logo() {
        return company_logo;
    }

    public void setCompany_logo(byte[] company_logo) {
        this.company_logo = company_logo;
    }

    public CompanyStatus getCompanyStatus() {
        return companyStatus;
    }

    public void setCompanyStatus(CompanyStatus companyStatus) {
        this.companyStatus = companyStatus;
    }

    public String getWebSite() {
        return webSite;
    }

    public void setWebSite(String webSite) {
        this.webSite = webSite;
    }

    public User getSupervisor() {
        return supervisor;
    }

    public void setSupervisor(User supervisor) {
        this.supervisor = supervisor;
    }
}
