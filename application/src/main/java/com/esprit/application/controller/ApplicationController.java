package com.esprit.application.controller;

import com.esprit.application.entity.Application;
import com.esprit.application.entity.ApplicationStatus;
import com.esprit.application.service.ApplicationService;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/applications")
@CrossOrigin(origins = "http://localhost:4200")
public class ApplicationController {
    @Autowired
    private ApplicationService applicationService;

    @GetMapping
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @GetMapping("/{id}")
    public Optional<Application> getApplicationById(@PathVariable Long id) {
        return applicationService.getApplicationById(id);
    }

    @GetMapping("/student/{studentId}")
    public List<Application> getApplicationsByStudentId(@PathVariable String studentId) {
        return applicationService.getApplicationsByStudentId(studentId);
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Application> submitApplication(
            @RequestParam("studentId") String studentId,
            @RequestParam("internshipId") Long internshipId,
            @RequestParam("submissionDate") String submissionDateStr,
            @RequestParam(value = "interviewDate", required = false) String interviewDateStr,
            @RequestParam("cv") MultipartFile cvFile) throws IOException, ParseException {

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date submissionDate = dateFormat.parse(submissionDateStr);
        Date interviewDate = (interviewDateStr != null && !interviewDateStr.isEmpty()) ? dateFormat.parse(interviewDateStr) : null;

        Application savedApplication = applicationService.submitApplication(studentId, internshipId, submissionDate, interviewDate, cvFile);
        return ResponseEntity.ok(savedApplication);
    }

    @DeleteMapping("/{id}")
    public void deleteApplication(@PathVariable Long id) {
        applicationService.deleteApplication(id);
    }

    @PutMapping("/application-status/{id}")
    public ResponseEntity<Application> updateApplicationStatus(
            @PathVariable Long id,
            @RequestParam("status") ApplicationStatus status) {
        try {
            Application updatedApplication = applicationService.updateApplicationStatus(id, status);
            return ResponseEntity.ok(updatedApplication);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/status/{studentId}")
    public ResponseEntity<String> getApplicationStatus(@PathVariable String studentId) {
        List<Application> applications = applicationService.getApplicationsByStudentId(studentId);
        if (!applications.isEmpty()) {
            StringBuilder statusList = new StringBuilder("Application Statuses:\n");
            for (Application app : applications) {
                statusList.append("Internship ID: ").append(app.getInternshipId())
                        .append(", Status: ").append(app.getStatus().name()).append("\n");
            }
            return ResponseEntity.ok(statusList.toString());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No applications found for this student.");
    }

    @GetMapping("/status/qr/{studentId}")
    public ResponseEntity<byte[]> generateQrCode(@PathVariable String studentId) {
        List<Application> applications = applicationService.getApplicationsByStudentId(studentId);
        if (applications.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        StringBuilder qrContent = new StringBuilder("Student ID: " + studentId + "\n");
        for (Application app : applications) {
            qrContent.append("Internship ID: ").append(app.getInternshipId())
                    .append(", Status: ").append(app.getStatus().name()).append("\n");
        }

        try {
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(qrContent.toString(), BarcodeFormat.QR_CODE, 300, 300);

            ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
            MatrixToImageWriter.writeToStream(bitMatrix, "PNG", pngOutputStream);
            byte[] pngData = pngOutputStream.toByteArray();

            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=QRCode.png");
            headers.setContentType(org.springframework.http.MediaType.IMAGE_PNG);

            return ResponseEntity.ok().headers(headers).body(pngData);
        } catch (WriterException | IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @GetMapping("/search")
    public List<Application> searchApplications(@RequestParam String studentId) {
        return applicationService.searchApplicationsByStudentId(studentId);
    }

}
