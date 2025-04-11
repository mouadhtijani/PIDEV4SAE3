package com.esprit.user.auth;

import com.esprit.user.Repository.TokenRepository;
import com.esprit.user.Repository.UserRepository;
import com.esprit.user.dto.AuthenticationRequest;
import com.esprit.user.dto.AuthenticationResponse;
import com.esprit.user.email.EmailService;
import com.esprit.user.email.EmailTemplateName;
import com.esprit.user.enums.Role;
import com.esprit.user.models.Token;
import com.esprit.user.models.User;
import com.esprit.user.security.JwtService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
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
public class AuthenticationService {
    private static final String activationUrl = "http://localhost:4200/activate-account";

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final EmailService emailService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Autowired
    public AuthenticationService(PasswordEncoder passwordEncoder,
                                 UserRepository userRepository,
                                 TokenRepository tokenRepository,
                                 EmailService emailService,
                                 AuthenticationManager authenticationManager,
                                 JwtService jwtService) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.emailService = emailService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public User register(MultipartFile image, String firstName, String lastName, String email, String password, Role role)
            throws IOException, MessagingException {
        // Handle image validation (optional)
        validateImage(image);

        Role userRole = (role == null) ? Role.STUDENT : role;
        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setUserImage(image.getBytes());  // Ensure the image is correctly processed
        user.setPassword(passwordEncoder.encode(password));  // Store the hashed password
        user.setEnabled(false);  // Initially, the user is disabled
        user.setAccountLocked(false);
        user.setRole(userRole);

        userRepository.save(user);  // Save the user to the database
        sendValidationEmail(user);  // Send the activation email
        return user;
    }

    private void validateImage(MultipartFile image) throws IOException {
        // Check if image is empty or exceeds a certain size (e.g., 10MB)
        if (image.isEmpty()) {
            throw new IOException("Image file is empty.");
        }
        if (image.getSize() > 10 * 1024 * 1024) {  // Example size limit of 10MB
            throw new IOException("Image file is too large.");
        }
        // Optionally: Validate file type (image/jpeg, image/png, etc.)
        String contentType = image.getContentType();
        if (!contentType.startsWith("image")) {
            throw new IOException("Invalid file type. Only image files are allowed.");
        }
    }

    private void sendValidationEmail(User user) throws MessagingException {
        String newToken = generateAndSaveActivationToken(user);
        emailService.sendEmail(user.getEmail(), user.fullName(), EmailTemplateName.ACTIVATION_ACCOUNT, activationUrl, newToken, "Account Activation");
    }

    private String generateAndSaveActivationToken(User user) {
        String generatedToken = generateActivationCode(6);
        Token token = new Token();
        token.setToken(generatedToken);
        token.setCreatedAt(LocalDateTime.now());
        token.setExpiredAt(LocalDateTime.now().plusHours(24));  // Token expires after 24 hours
        token.setUser(user);
        tokenRepository.save(token);
        return generatedToken;
    }

    private String generateActivationCode(int length) {
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }
        return codeBuilder.toString();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = (User) auth.getPrincipal();
        var claims = new HashMap<String, Object>();
        claims.put("fullname", user.fullName());
        var jwtToken = jwtService.generateToken(claims, user);
        return new AuthenticationResponse(jwtToken, user.getUserId(), user.getRole());
    }

    public void activateAccount(String token) throws MessagingException {
        Token savedToken = tokenRepository.findByToken(token).orElseThrow(() -> new RuntimeException("Invalid Token"));
        if (LocalDateTime.now().isAfter(savedToken.getExpiredAt())) {
            sendValidationEmail(savedToken.getUser());  // Resend a new token if expired
            throw new RuntimeException("Activation Token has expired. A new token has been sent to your email.");
        }
        User user = userRepository.findById(savedToken.getUser().getUserId()).orElseThrow(() -> new UsernameNotFoundException("User Not Found"));
        user.setEnabled(true);  // Activate the user
        userRepository.save(user);
        savedToken.setValidateAt(LocalDateTime.now());
        tokenRepository.save(savedToken);  // Mark the token as validated
    }
}
