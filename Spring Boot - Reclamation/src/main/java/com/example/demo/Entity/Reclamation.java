package com.example.demo.Entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Reclamation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private ReclamationStatus status = ReclamationStatus.PENDING;

    private String userId;
    private String adminResponse;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    private UserType userType;


    @OneToMany(mappedBy = "reclamation", cascade = CascadeType.ALL)
    private List<HistoryEntry> historyEntries = new ArrayList<>();

    // Getters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public ReclamationStatus getStatus() { return status; }
    public String getUserId() { return userId; }
    public String getAdminResponse() { return adminResponse; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public UserType getUserType() { return userType; }

    // Setters
    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setStatus(ReclamationStatus status) { this.status = status; }
    public void setUserId(String userId) { this.userId = userId; }
    public void setAdminResponse(String adminResponse) { this.adminResponse = adminResponse; }
    public void setUserType(UserType userType) { this.userType = userType; }
}
