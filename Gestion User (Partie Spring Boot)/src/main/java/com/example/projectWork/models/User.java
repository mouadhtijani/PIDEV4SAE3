package com.example.projectWork.models;

import com.example.projectWork.enums.ClassLevel;
import com.example.projectWork.enums.Role;
import com.example.projectWork.enums.Speciality;
import com.example.projectWork.enums.StudentLevel;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import java.io.Serializable;
import java.util.Collection;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

public class User implements UserDetails, Principal, Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;
    private String firstName;
    private String lastName ;
    @Column(unique = true)
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Enumerated(EnumType.STRING)
    private StudentLevel studentLevel;
    @Enumerated(EnumType.STRING)
    private ClassLevel classeLevel;
    @Enumerated(EnumType.STRING)
    private Speciality specialty;
    @Lob
    @Column(name = "user_imageData",length = 10000000 ,nullable = true)
    private byte[] userImage;
    @Lob
    @Column(name = "user_cvData",length = 10000000 ,nullable = true)
    private byte[] studentCV;
    @Column(name = "is_enabled")
    private boolean isEnabled = false;
    private boolean accountLocked;
    private LocalDate birthdate;
    @CreatedDate
    @Column(nullable = false,updatable = false)
    private LocalDateTime creationDate;
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !accountLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }

    public String fullName(){
        return firstName+" "+lastName;
    }

    @Override
    public String getName() {
        return email;
    }
}
