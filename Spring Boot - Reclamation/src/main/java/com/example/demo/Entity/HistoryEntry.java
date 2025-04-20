package com.example.demo.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class    HistoryEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ActionType actionType;

    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "reclamation_id")
    private Reclamation reclamation;

    public HistoryEntry() {
        this.timestamp = LocalDateTime.now();
    }

    public HistoryEntry(ActionType actionType, Reclamation reclamation) {
        this();
        this.actionType = actionType;
        this.reclamation = reclamation;
    }

    // ✅ GETTERS
    public Long getId() {
        return id;
    }

    public ActionType getActionType() {
        return actionType;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public Reclamation getReclamation() {
        return reclamation;
    }

    // ✅ SETTERS
    public void setActionType(ActionType actionType) {
        this.actionType = actionType;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public void setReclamation(Reclamation reclamation) {
        this.reclamation = reclamation;
    }

    @Override
    public String toString() {
        return "HistoryEntry{" +
                "id=" + id +
                ", actionType=" + actionType +
                ", timestamp=" + timestamp +
                ", reclamationId=" + (reclamation != null ? reclamation.getId() : "null") +
                '}';
    }
}
