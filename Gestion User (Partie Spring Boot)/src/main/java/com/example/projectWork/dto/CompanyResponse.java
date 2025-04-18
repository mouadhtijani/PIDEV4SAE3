package com.example.projectWork.dto;

import com.example.projectWork.enums.CompanyStatus;
import com.example.projectWork.enums.Domaine;
import com.example.projectWork.models.User;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CompanyResponse {
    private int CompanyId;
    private String companyName;
    private String address;
    @Enumerated(EnumType.STRING)
    private Domaine domaine;
    private String webSite;
    private String companyEmail;
    private int companyTelephone;
    private User supervisor;
    @Enumerated(EnumType.STRING)
    private CompanyStatus companyStatus;
    private int ZipCode;
    private byte[] company_logo;




}
