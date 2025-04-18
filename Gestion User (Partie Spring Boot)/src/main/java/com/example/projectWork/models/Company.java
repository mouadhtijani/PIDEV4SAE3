package com.example.projectWork.models;

import com.example.projectWork.enums.CompanyStatus;
import com.example.projectWork.enums.Domaine;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;


@Entity
@Data
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

}
