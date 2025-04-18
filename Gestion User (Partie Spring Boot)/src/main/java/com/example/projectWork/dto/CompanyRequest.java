package com.example.projectWork.dto;
import com.example.projectWork.enums.Domaine;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
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


}
