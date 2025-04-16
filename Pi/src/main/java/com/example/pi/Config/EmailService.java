package com.example.pi.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // Send an email
    public void sendEmail(String[] to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("groupepi555@gmail.com");
        message.setTo(to); // Array of recipients
        message.setSubject(subject);
        message.setText(body);

        try {
            mailSender.send(message);  // Send email
            System.out.println("Email sent successfully!");
        } catch (Exception e) {
            System.out.println("Error sending email: " + e.getMessage());
        }
    }
}
