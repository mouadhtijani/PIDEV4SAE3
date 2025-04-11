package com.esprit.user.dto;

import com.esprit.user.enums.CompanyStatus;
import com.esprit.user.enums.Domaine;
import com.esprit.user.models.User;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CompanyResponse {
    private int companyId; // ✅ FIXED: Renamed from CompanyId to companyId (Camel Case)
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

    private int zipCode; // ✅ FIXED: Renamed from ZipCode to zipCode (Camel Case)

    private byte[] companyLogo; // ✅ FIXED: Renamed from company_logo to companyLogo (Camel Case)
}
