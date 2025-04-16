package tn.backend.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.backend.backend.Entities.Report;

public interface ReportRepository extends JpaRepository<Report, Long> {
}
