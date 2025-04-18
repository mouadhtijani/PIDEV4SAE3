package com.example.projectWork.auth;

import com.example.projectWork.Repository.TokenRepository;
import com.example.projectWork.Repository.UserRepository;
import com.example.projectWork.dto.AuthenticationRequest;
import com.example.projectWork.dto.AuthenticationResponse;
import com.example.projectWork.email.EmailService;
import com.example.projectWork.email.EmailTemplateName;
import com.example.projectWork.enums.Role;
import com.example.projectWork.models.Token;
import com.example.projectWork.models.User;
import com.example.projectWork.security.JwtService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private static final String activationUrl = "http://localhost:4200/activate-account";
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final EmailService emailService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    public User register(MultipartFile image, String firstName, String lastName, String email, String password, Role role) throws IOException, MessagingException {
        Role userRole;
        if(role==null){
            userRole = Role.STUDENT  ;
        }
        else{
            userRole=role;
        }
        var user = User
                .builder()
                .firstName(firstName)
                .lastName(lastName)
                .email(email)
                .userImage(image.getBytes())
                .password(passwordEncoder.encode(password))
                .isEnabled(false)
                .accountLocked(false)
                .role(userRole)
                .build();
        userRepository.save(user);
        sendValidationEmail(user);
        return user;
    }


    private void sendValidationEmail(User user) throws MessagingException {
        var newToken = generateAndSaveActivationToken(user);
        emailService.sendEmail(user.getEmail(), user.fullName(), EmailTemplateName.ACTIVATION_ACCOUNT,activationUrl,newToken,"Account Activation" );
    }

    private String generateAndSaveActivationToken(User user) {
        String generatedToken = generateActivationCode(6);
        var token= Token
                .builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiredAt(LocalDateTime.now().plusHours(24))
                .user(user)
                .build();
        tokenRepository.save(token);
        return generatedToken;
    }

    private String generateActivationCode(int length) {
        String characters="0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();
        for (int i=0;i<length;i++){
            int randomIndex=secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }
        return codeBuilder.toString();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()));
        var claims = new HashMap<String,Object>();
        var user=((User)auth.getPrincipal());
        claims.put("fullname",user.fullName());
        var jwtToken= jwtService.generateToken(claims,user);
        return AuthenticationResponse.builder().token(jwtToken).userID(user.getUserId()).userRole(user.getRole()).build();
    }

    public void activateAccount(String token) throws MessagingException {
        Token savedToken = tokenRepository.findByToken(token).orElseThrow(()-> new RuntimeException("Invalid Token"));
        if(LocalDateTime.now().isAfter(savedToken.getExpiredAt())){
            sendValidationEmail(savedToken.getUser());
            throw new RuntimeException("Activation Token has been expired . a new Token  has been sent to your email ");
        }
        var user = userRepository.findById(savedToken.getUser().getUserId()).orElseThrow(()-> new UsernameNotFoundException("User Not Found "));
        user.setEnabled(true);
        userRepository.save(user);
        savedToken.setValidateAt(LocalDateTime.now());
        tokenRepository.save(savedToken);


    }

}
