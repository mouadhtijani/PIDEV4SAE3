    package com.esprit.user.auth;

    import com.esprit.user.dto.AuthenticationRequest;
    import com.esprit.user.dto.AuthenticationResponse;
    import com.esprit.user.enums.Role;
    import com.esprit.user.models.User;
    import io.swagger.v3.oas.annotations.Operation;
    import jakarta.mail.MessagingException;
    import lombok.RequiredArgsConstructor;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.security.authentication.AuthenticationManager;
    import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
    import org.springframework.web.bind.annotation.*;
    import org.springframework.web.multipart.MultipartFile;

    import java.io.IOException;

    @RestController
    @RequestMapping("/api/v1/auth")
    public class AuthenticationController {

        private final AuthenticationService service;

        public AuthenticationController(AuthenticationService service) {
            this.service = service;
        }

        // This method handles registration without authentication
        @PostMapping("/register")
        @ResponseStatus(HttpStatus.CREATED)
        public User register(
                @RequestParam("firstName") String firstName,
                @RequestParam("lastName") String lastName,
                @RequestParam("email") String email,
                @RequestParam("password") String password,
                @RequestParam("role") Role role,
                @RequestParam("userImage") MultipartFile userImage
        ) throws MessagingException, IOException {
            return service.register(userImage, firstName, lastName, email, password, role);
        }



        @PostMapping("/authenticate")
        @ResponseStatus(HttpStatus.ACCEPTED)
        public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
            return ResponseEntity.ok(service.authenticate(request));
        }

        @GetMapping("/activate-account")
        public void confirm(@RequestParam("token") String token) throws MessagingException {
            service.activateAccount(token);
        }
    }
