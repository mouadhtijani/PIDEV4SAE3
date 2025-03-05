package com.esprit.application.service;

import com.esprit.application.entity.Application;
import com.esprit.application.entity.ApplicationStatus;
import com.esprit.application.repo.ApplicationRepo;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {
    @Autowired
    private ApplicationRepo applicationRepository;

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public Optional<Application> getApplicationById(Long id) {
        return applicationRepository.findById(id);
    }

    public List<Application> getApplicationsByStudentId(String studentId) {
        return applicationRepository.findByStudentId(studentId);
    }

    public Application submitApplication(String studentId, Long internshipId, Date submissionDate, Date interviewDate, MultipartFile cvFile) throws IOException {
        Application application = new Application();
        application.setStudentId(studentId);
        application.setInternshipId(internshipId);
        application.setSubmissionDate(submissionDate);
        application.setInterviewDate(interviewDate);
        application.setStatus(ApplicationStatus.PENDING);
        application.setCv(cvFile.getBytes());

        return applicationRepository.save(application);
    }

    public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }

    public Application updateApplicationStatus(Long id, ApplicationStatus status) {
        Optional<Application> applicationOpt = applicationRepository.findById(id);
        if (applicationOpt.isPresent()) {
            Application application = applicationOpt.get();
            application.setStatus(status);
            return applicationRepository.save(application);
        } else {
            throw new RuntimeException("Application not found");
        }
    }

    public Optional<Application> findLatestApplicationByStudentId(String studentId) {
        return applicationRepository.findFirstByStudentIdOrderBySubmissionDateDesc(studentId);
    }

    public byte[] generateQRCode(String studentId) throws WriterException, IOException {
        Optional<Application> applicationOpt = findLatestApplicationByStudentId(studentId);
        if (applicationOpt.isEmpty()) {
            throw new RuntimeException("Application not found for student: " + studentId);
        }

        String qrContent = "Student ID: " + studentId + "\nStatus: " + applicationOpt.get().getStatus().name();
        int width = 300;
        int height = 300;
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(qrContent, BarcodeFormat.QR_CODE, width, height);

        ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", pngOutputStream);
        return pngOutputStream.toByteArray();
    }
    public List<Application> searchApplicationsByStudentId(String studentId) {
        return applicationRepository.findByStudentIdContaining(studentId);
    }

}
