package com.esprit.reclamation.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Reclamation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String typeUser;    // "student" ou "company"
    private String nomUser;     // nom d'utilisateur
    private String objet;

    @Column(length = 1000)
    private String description;

    private LocalDate dateCreation;

    @OneToOne(mappedBy = "reclamation", cascade = CascadeType.ALL)
    private Response response;

    // Getters & Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTypeUser() { return typeUser; }
    public void setTypeUser(String typeUser) { this.typeUser = typeUser; }

    public String getNomUser() { return nomUser; }
    public void setNomUser(String nomUser) { this.nomUser = nomUser; }

    public String getObjet() { return objet; }
    public void setObjet(String objet) { this.objet = objet; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDate getDateCreation() { return dateCreation; }
    public void setDateCreation(LocalDate dateCreation) { this.dateCreation = dateCreation; }

    public Response getResponse() {
        return response;
    }

    public void setResponse(Response response) { this.response = response; }

}
