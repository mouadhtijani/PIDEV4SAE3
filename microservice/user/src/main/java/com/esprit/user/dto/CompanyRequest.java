package com.esprit.user.dto;
import com.esprit.user.enums.Domaine;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CompanyRequest {
    private int supervisorId;
    @NotEmpty(message = "CompanyName is mandatory")
    @NotBlank(message = "CompanyName is mandatory")
    private String companyName;
    @NotEmpty(message = "Address is mandatory")
    @NotBlank(message = "Address is mandatory")
    private String address;
    @NotEmpty(message = "Domaine is mandatory")
    @NotBlank(message = "Domaine is mandatory")
    private Domaine domaine;
    @NotEmpty(message = "Website is mandatory")
    @NotBlank(message = "Website is mandatory")
    private String webSite;
    @NotEmpty(message = "Email is mandatory")
    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email is not formatted")
    private String companyEmail;
    @NotEmpty(message = "Telephone number is mandatory")
    @NotBlank(message = "Telephone number is mandatory")
    @Size(min = 8 ,max = 8 ,message = "Max telephone number is 8")
    private int companyTelephone;
    private int ZipCode;
    private byte[] companyLogo;

    public int getSupervisorId() {
        return supervisorId;
    }

    public void setSupervisorId(int supervisorId) {
        this.supervisorId = supervisorId;
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

    public String getWebSite() {
        return webSite;
    }

    public void setWebSite(String webSite) {
        this.webSite = webSite;
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

    public byte[] getCompanyLogo() {
        return companyLogo;
    }

    public void setCompanyLogo(byte[] companyLogo) {
        this.companyLogo = companyLogo;
    }
}
