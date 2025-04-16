package tn.backend.backend.Services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import tn.backend.backend.Entities.Report;
import tn.backend.backend.Entities.UserPoints;
import tn.backend.backend.Repository.ReportRepository;
import tn.backend.backend.Repository.UserPointsRepository;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserPointsRepository userPointsRepository;

    public void saveReport(Report report) {
        reportRepository.save(report);
        sendReportCreationEmail(report);
    }

    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    public Optional<Report> resolveReport(Long id) {
        Optional<Report> reportOptional = reportRepository.findById(id);
        if (reportOptional.isPresent()) {
            Report report = reportOptional.get();
            report.setStatus("resolved");
            reportRepository.save(report);
            sendReportResolvedEmail(report);
            return Optional.of(report);
        }
        return Optional.empty();
    }

    private void sendReportCreationEmail(Report report) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo("hazem.somrani@esprit.tn");
            helper.setSubject("Your Report Has Been Submitted");
            helper.setFrom("mehergames29@gmail.com", "Content Moderation Team");

            String htmlContent = "<!DOCTYPE html>" +
                    "<html>" +
                    "<head>" +
                    "<style>" +
                    "body { font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }" +
                    ".container { max-width: 600px; margin: 20px auto; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }" +
                    "h1 { color: #2c3e50; text-align: center; }" +
                    "p { line-height: 1.6; }" +
                    ".report-details { background: #ecf0f1; padding: 15px; border-radius: 5px; }" +
                    ".footer { text-align: center; font-size: 12px; color: #7f8c8d; margin-top: 20px; }" +
                    ".highlight { color: #2980b9; font-weight: bold; }" +
                    "</style>" +
                    "</head>" +
                    "<body>" +
                    "<div class='container'>" +
                    "<h1>Your Report Has Been Submitted</h1>" +
                    "<p>Thank you for submitting a report. Below are the details of your submission:</p>" +
                    "<div class='report-details'>" +
                    "<p><strong>Report ID:</strong> <span class='highlight'>" + report.getId() + "</span></p>" +
                    "<p><strong>Type:</strong> " + report.getType() + "</p>" +
                    "<p><strong>Content ID:</strong> " + report.getContentId() + "</p>" +
                    "<p><strong>Reason:</strong> " + report.getReason() + "</p>" +
                    "<p><strong>Status:</strong> <span class='highlight'>" + report.getStatus() + "</span></p>" +
                    "<p><strong>Date:</strong> " + report.getDate().toString() + "</p>" +
                    "</div>" +
                    "<p>We appreciate your effort in maintaining the quality of our platform. Please review this report in the <a href='http://localhost:4200/admin/reports' style='color: #2980b9;'>Content Moderation Dashboard</a> if needed.</p>" +
                    "<div class='footer'>" +
                    "© 2025 Content Moderation Team | All rights reserved" +
                    "</div>" +
                    "</div>" +
                    "</body>" +
                    "</html>";

            helper.setText(htmlContent, true);
            mailSender.send(message);
            System.out.println("HTML Email sent successfully (Submitted)");
        } catch (MessagingException e) {
            System.err.println("Failed to send submission email: " + e.getMessage());
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    private void sendReportResolvedEmail(Report report) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo("hazem.somrani@esprit.tn");
            helper.setSubject("Your Report Has Been Resolved");
            helper.setFrom("mehergames29@gmail.com");

            String htmlContent = "<!DOCTYPE html>" +
                    "<html>" +
                    "<head>" +
                    "<style>" +
                    "body { font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }" +
                    ".container { max-width: 600px; margin: 20px auto; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }" +
                    "h1 { color: #2c3e50; text-align: center; }" +
                    "p { line-height: 1.6; }" +
                    ".report-details { background: #ecf0f1; padding: 15px; border-radius: 5px; }" +
                    ".footer { text-align: center; font-size: 12px; color: #7f8c8d; margin-top: 20px; }" +
                    ".highlight { color: #27ae60; font-weight: bold; }" + // Green for resolved status
                    "</style>" +
                    "</head>" +
                    "<body>" +
                    "<div class='container'>" +
                    "<h1>Your Report Has Been Resolved</h1>" +
                    "<p>We’re pleased to inform you that your report has been reviewed and resolved. Here are the details:</p>" +
                    "<div class='report-details'>" +
                    "<p><strong>Report ID:</strong> <span class='highlight'>" + report.getId() + "</span></p>" +
                    "<p><strong>Type:</strong> " + report.getType() + "</p>" +
                    "<p><strong>Content ID:</strong> " + report.getContentId() + "</p>" +
                    "<p><strong>Reason:</strong> " + report.getReason() + "</p>" +
                    "<p><strong>Status:</strong> <span class='highlight'>" + report.getStatus() + "</span></p>" +
                    "<p><strong>Date:</strong> " + report.getDate().toString() + "</p>" +
                    "</div>" +
                    "<p>Thank you for helping us maintain a safe and respectful platform. For more details, visit the <a href='http://localhost:4200/admin/reports' style='color: #2980b9;'>Content Moderation Dashboard</a>.</p>" +
                    "<div class='footer'>" +
                    "© 2025 Content Moderation Team | All rights reserved" +
                    "</div>" +
                    "</div>" +
                    "</body>" +
                    "</html>";

            helper.setText(htmlContent, true);
            mailSender.send(message);
            System.out.println("HTML Email sent successfully to (Resolved)");
        } catch (MessagingException e) {
            System.err.println("Failed to send resolved email: " + e.getMessage());
            e.printStackTrace();
        }
    }
}