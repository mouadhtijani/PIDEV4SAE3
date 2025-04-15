package com.example.pi;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "supervisors")


@Builder
@Data
public class Supervisor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @OneToMany(mappedBy = "supervisor")
    @JsonIgnoreProperties("supervisor") // <- Évite le cycle inverse
    private List<Etudiant> etudiants;

    // Explicit no-argument constructor
    public Supervisor() {
    }

    // Constructor without id (for creating new supervisors)
    public Supervisor(String name, String email, List<Etudiant> etudiants) {
        this.name = name;
        this.email = email;
        this.etudiants = etudiants;
    }


    // Getter pour id
    public Long getId() {
        return id;
    }

    // Setter pour id
    public void setId(Long id) {
        this.id = id;
    }

    // Getter pour name
    public String getName() {
        return name;
    }

    // Setter pour name
    public void setName(String name) {
        this.name = name;
    }

    // Getter pour email
    public String getEmail() {
        return email;
    }

    // Setter pour email
    public void setEmail(String email) {
        this.email = email;
    }

    // Getter pour la liste des étudiants
    public List<Etudiant> getEtudiants() {
        return etudiants;
    }

    // Setter pour la liste des étudiants
    public void setEtudiants(List<Etudiant> etudiants) {
        this.etudiants = etudiants;
    }
}
