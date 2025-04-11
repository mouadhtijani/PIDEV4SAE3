package com.esprit.user.dto;

import com.esprit.user.enums.Role;
import lombok.*;

@Data
@Getter
@Setter
@Builder

@NoArgsConstructor
public class AuthenticationResponse {
    private String token;
    private int userID;
    private Role userRole;
    public AuthenticationResponse(String token, int userID, Role userRole) {
        this.token = token;
        this.userID = userID;
        this.userRole = userRole;
    }
}
