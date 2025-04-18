package com.example.projectWork.Repository;


import com.example.projectWork.enums.CompanyStatus;
import com.example.projectWork.enums.Domaine;
import com.example.projectWork.models.Company;
import com.example.projectWork.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface CompanyRepository  extends JpaRepository<Company,Integer> {
    List<Company> findAllByCompanyStatus(CompanyStatus companyStatus);

    List<Company> findAllByDomaine (Domaine domaine);
    Company findByCompanyName(String companyName);

    Company findBySupervisor(User supervisor);
}
