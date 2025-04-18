package com.example.projectWork.email;


import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import static java.nio.charset.StandardCharsets.UTF_8;
import static org.springframework.mail.javamail.MimeMessageHelper.MULTIPART_MODE_MIXED;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    @Async
    public void sendEmail(String to,String username ,EmailTemplateName emailTemplateName,String confirmationUrl,String activationCode,String subject) throws MessagingException {
        String templateName;
        if(emailTemplateName == null){
            templateName="confirm-email";
        }else{
            templateName=emailTemplateName.getName();
        }
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,MULTIPART_MODE_MIXED,UTF_8.name());
        Map<String, Object> proprities =new HashMap<>();
        proprities.put("username",username);
        proprities.put("confirmationUrl",confirmationUrl);
        proprities.put("activation_code",activationCode);
        Context context = new Context();
        context.setVariables(proprities);
        helper.setFrom("ounissiroua1@gmail.com") ;
        helper.setTo(to);
        helper.setSubject(subject);
        String template = templateEngine.process(templateName,context);
        helper.setText(template,true);
        mailSender.send(mimeMessage);
    }
    @Async
    public void sendCompanyCodeEmail(String to,String username ,EmailTemplateName emailTemplateName,String activationCode ,String subject) throws MessagingException {
        String templateName;
        if(emailTemplateName == null){
            templateName="confirm-email";
        }else{
            templateName=emailTemplateName.getName();
        }
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,MULTIPART_MODE_MIXED,UTF_8.name());
        Map<String, Object> proprities =new HashMap<>();
        proprities.put("username",username);
        proprities.put("company_code",activationCode);
        Context context = new Context();
        context.setVariables(proprities);
        helper.setFrom("ounissiroua1@gmail.com") ;
        helper.setTo(to);
        helper.setSubject(subject);
        String template = templateEngine.process(templateName,context);
        helper.setText(template,true);
        mailSender.send(mimeMessage);
    }
    @Async
    public void sendApplicationConfirmationEmail(String to, String username , EmailTemplateName emailTemplateName, String subject) throws MessagingException {
        String templateName;
        templateName=emailTemplateName.getName();
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,MULTIPART_MODE_MIXED,UTF_8.name());
        Map<String, Object> proprities =new HashMap<>();
        proprities.put("username",username);
        proprities.put("ConfirmationDate",LocalDateTime.now());
        Context context = new Context();
        if(templateName.equals("application_accepted")){
            //send Confirmation email
           // proprities.put("status",ApplicationStatus.ACCEPTED);
            context.setVariables(proprities);
            helper.setFrom("ounissiroua1@gmail.com") ;
            helper.setTo(to);
            helper.setSubject(subject);
            String template = templateEngine.process(templateName,context);
            helper.setText(template,true);
            mailSender.send(mimeMessage);

        }else{
            //send Refuse email
           // proprities.put("status",ApplicationStatus.REFUSED);
            context.setVariables(proprities);
            helper.setFrom("ounissiroua1@gmail.com") ;
            helper.setTo(to);
            helper.setSubject(subject);
            String template = templateEngine.process(templateName,context);
            helper.setText(template,true);
            mailSender.send(mimeMessage);

        }
    }





}
