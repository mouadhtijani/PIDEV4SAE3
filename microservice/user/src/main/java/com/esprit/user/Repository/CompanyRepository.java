package com.esprit.user.Repository;


import com.esprit.user.enums.CompanyStatus;
import com.esprit.user.enums.Domaine;
import com.esprit.user.models.Company;
import com.esprit.user.models.User;
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
