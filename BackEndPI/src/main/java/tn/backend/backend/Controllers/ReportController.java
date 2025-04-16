package tn.backend.backend.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.backend.backend.Entities.Report;
import tn.backend.backend.Services.ReportService;

import java.util.List;

@RestController
@RequestMapping("/report-content")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping
    public ResponseEntity<?> reportContent(@RequestBody Report report) {
        System.out.print(report);
        reportService.saveReport(report);
        return ResponseEntity.ok("Report submitted successfully.");
    }

    @GetMapping
    public ResponseEntity<List<Report>> getAllReports() {
        List<Report> reports = reportService.getAllReports();
        return ResponseEntity.ok(reports);
    }

    @PutMapping("/{id}/resolve")
    public ResponseEntity<Report> resolveReport(@PathVariable Long id) {
        return reportService.resolveReport(id)
                .map(updatedReport -> ResponseEntity.ok(updatedReport))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
