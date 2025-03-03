package com.example.projectWork.auth;
import com.example.projectWork.dto.AuthenticationRequest;
import com.example.projectWork.dto.AuthenticationResponse;
import com.example.projectWork.enums.Role;
import com.example.projectWork.models.User;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public User register(@RequestParam("userImage") MultipartFile  image, @RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName, @RequestParam("email") String email, @RequestParam("password") String password, @RequestParam("role") Role role) throws MessagingException, IOException {
        return service.register(image,firstName,lastName,email,password,role);

    }
    @PostMapping("/authenticate")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody  AuthenticationRequest request  )  {
        return ResponseEntity.ok (service.authenticate(request));
    }
    @GetMapping("activate-account")
    public void confirm(@RequestParam("token") String token) throws MessagingException {
        service.activateAccount(token);
    }



}
