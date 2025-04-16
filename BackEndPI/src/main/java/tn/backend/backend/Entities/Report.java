package tn.backend.backend.Entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // 'post' or 'reply'
    private Long contentId;
    private String reason;

    @Column(nullable = false, columnDefinition = "varchar(255) default 'pending'")
    private String status = "pending";

    @Column(nullable = false)
    private LocalDateTime date = LocalDateTime.now();

    public Report() {}

    public Report(String type, Long contentId, String reason) {
        this.type = type;
        this.contentId = contentId;
        this.reason = reason;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getContentId() {
        return contentId;
    }

    public void setContentId(Long contentId) {
        this.contentId = contentId;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Report{" +
                "id=" + id +
                ", type='" + type + '\'' +
                ", contentId=" + contentId +
                ", reason='" + reason + '\'' +
                ", status='" + status + '\'' +
                ", date=" + date +
                '}';
    }
}