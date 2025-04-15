    package com.example.pi;

    import com.fasterxml.jackson.annotation.JsonBackReference;
    import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
    import jakarta.persistence.*;
    import lombok.*;

    @Entity
    @Data

    @Builder
    @Table(name = "etudiants")
    public class Etudiant {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(nullable = false)
        private String nom;

        @Column(nullable = false)
        private String prenom;

        @Column(unique = true, nullable = false)
        private String email;

        @Column(nullable = false)
        private String filiere;

        @Column(nullable = false)
        private int annee;

        @ManyToOne
        @JsonIgnoreProperties("etudiants") // <- Évite les cycles de sérialisation JSON
        private Supervisor supervisor;

        public Etudiant() {
        }

        // Constructeur avec tous les attributs
        public Etudiant(Long id, String nom, String prenom, String email, String filiere, int annee, Supervisor supervisor) {
            this.id = id;
            this.nom = nom;
            this.prenom = prenom;
            this.email = email;
            this.filiere = filiere;
            this.annee = annee;
            this.supervisor = supervisor;
        }

        // Getters et Setters

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getNom() {
            return nom;
        }

        public void setNom(String nom) {
            this.nom = nom;
        }

        public String getPrenom() {
            return prenom;
        }

        public void setPrenom(String prenom) {
            this.prenom = prenom;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getFiliere() {
            return filiere;
        }

        public void setFiliere(String filiere) {
            this.filiere = filiere;
        }

        public int getAnnee() {
            return annee;
        }

        public void setAnnee(int annee) {
            this.annee = annee;
        }

        public Supervisor getSupervisor() {
            return supervisor;
        }

        public void setSupervisor(Supervisor supervisor) {
            this.supervisor = supervisor;
        }

        // Méthode toString pour afficher l'objet
        @Override
        public String toString() {
            return "Etudiant{" +
                    "id=" + id +
                    ", nom='" + nom + '\'' +
                    ", prenom='" + prenom + '\'' +
                    ", email='" + email + '\'' +
                    ", filiere='" + filiere + '\'' +
                    ", annee=" + annee +
                    ", supervisor=" + supervisor +
                    '}';
        }
    }

