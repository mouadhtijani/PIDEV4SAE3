package com.esprit.reclamation.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Response {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;

    @Column(name = "response_date")
    private LocalDate responseDate;

    // ManyToOne relation with Reclamation (Many Responses to One Reclamation)
    @ManyToOne
    @JoinColumn(name = "reclamation_id") // Specify the foreign key column
    private Reclamation reclamation;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDate getResponseDate() {
        return responseDate;
    }

    public void setResponseDate(LocalDate responseDate) {
        this.responseDate = responseDate;
    }

    public Reclamation getReclamation() {
        return reclamation;
    }

    public void setReclamation(Reclamation reclamation) {
        this.reclamation = reclamation;
    }
}
