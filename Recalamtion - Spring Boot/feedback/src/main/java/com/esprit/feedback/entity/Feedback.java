package com.esprit.feedback.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Feedback {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long feedbackId;

        private Float rating;
        private String comment;
        private Long internshipId; // Reference to Internship (handled via Feign Client)

        public Long getFeedbackId() {
                return feedbackId;
        }

        public void setFeedbackId(Long feedbackId) {
                this.feedbackId = feedbackId;
        }

        public Float getRating() {
                return rating;
        }

        public void setRating(Float rating) {
                this.rating = rating;
        }

        public String getComment() {
                return comment;
        }

        public void setComment(String comment) {
                this.comment = comment;
        }

        public Long getInternshipId() {
                return internshipId;
        }

        public void setInternshipId(Long internshipId) {
                this.internshipId = internshipId;
        }
}