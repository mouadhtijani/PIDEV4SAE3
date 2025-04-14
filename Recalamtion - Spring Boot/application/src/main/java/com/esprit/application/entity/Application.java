package com.esprit.application.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Application {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long applicationId;

        private String studentId; // String pour lier l'étudiant
        private Long internshipId; // L'ID du stage

        @Temporal(TemporalType.DATE)
        private Date submissionDate;

        @Temporal(TemporalType.DATE)
        private Date interviewDate;

        @Lob
        private byte[] cv; // Stockage du CV en base64 ou en BLOB

        @Enumerated(EnumType.STRING)
        private ApplicationStatus status = ApplicationStatus.PENDING;

        public Long getApplicationId() {
                return applicationId;
        }

        public void setApplicationId(Long applicationId) {
                this.applicationId = applicationId;
        }

        public String getStudentId() {
                return studentId;
        }

        public void setStudentId(String studentId) {
                this.studentId = studentId;
        }

        public Long getInternshipId() {
                return internshipId;
        }

        public void setInternshipId(Long internshipId) {
                this.internshipId = internshipId;
        }

        public Date getSubmissionDate() {
                return submissionDate;
        }

        public void setSubmissionDate(Date submissionDate) {
                this.submissionDate = submissionDate;
        }

        public Date getInterviewDate() {
                return interviewDate;
        }

        public void setInterviewDate(Date interviewDate) {
                this.interviewDate = interviewDate;
        }

        public byte[] getCv() {
                return cv;
        }

        public void setCv(byte[] cv) {
                this.cv = cv;
        }

        public ApplicationStatus getStatus() {
                return status;
        }

        public void setStatus(ApplicationStatus status) {
                this.status = status;
        }
}




