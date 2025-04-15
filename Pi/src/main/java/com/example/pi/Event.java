package com.example.pi;



import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventId;

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private EventType eventType;

    private String category;
    private String status;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime startDate;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime endDate;
    private String timezone;

    private String location;
    private String venueMapURL;
    private Integer maxAttendees;

    private Integer interestedCount = 0;
    private Integer notInterestedCount = 0;
    private Integer somewhatInterestedCount = 0;
    private Double latitude;
    private Double longitude;

    @ElementCollection
    private List<String> registeredUsers; // Store user IDs

    private Boolean aiGeneratedAgenda;
    private Boolean chatbotEnabled;
    private Boolean realTimeTranslation;

    private String liveStreamingLink;
    private String recordedSessionLink;

    private Boolean gdprCompliant;
    private Boolean moderationToolsEnabled;


    // Constructors, Getters & Setters
    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public EventType getEventType() {
        return eventType;
    }

    public void setEventType(EventType eventType) {
        this.eventType = eventType;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public String getTimezone() {
        return timezone;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getVenueMapURL() {
        return venueMapURL;
    }

    public void setVenueMapURL(String venueMapURL) {
        this.venueMapURL = venueMapURL;
    }

    public Integer getMaxAttendees() {
        return maxAttendees;
    }

    public void setMaxAttendees(Integer maxAttendees) {
        this.maxAttendees = maxAttendees;
    }

    public List<String> getRegisteredUsers() {
        return registeredUsers;
    }

    public void setRegisteredUsers(List<String> registeredUsers) {
        this.registeredUsers = registeredUsers;
    }

    public Boolean getAiGeneratedAgenda() {
        return aiGeneratedAgenda;
    }

    public void setAiGeneratedAgenda(Boolean aiGeneratedAgenda) {
        this.aiGeneratedAgenda = aiGeneratedAgenda;
    }

    public Boolean getChatbotEnabled() {
        return chatbotEnabled;
    }

    public void setChatbotEnabled(Boolean chatbotEnabled) {
        this.chatbotEnabled = chatbotEnabled;
    }

    public Boolean getRealTimeTranslation() {
        return realTimeTranslation;
    }

    public void setRealTimeTranslation(Boolean realTimeTranslation) {
        this.realTimeTranslation = realTimeTranslation;
    }

    public String getLiveStreamingLink() {
        return liveStreamingLink;
    }

    public void setLiveStreamingLink(String liveStreamingLink) {
        this.liveStreamingLink = liveStreamingLink;
    }

    public String getRecordedSessionLink() {
        return recordedSessionLink;
    }

    public void setRecordedSessionLink(String recordedSessionLink) {
        this.recordedSessionLink = recordedSessionLink;
    }

    public Boolean getGdprCompliant() {
        return gdprCompliant;
    }

    public void setGdprCompliant(Boolean gdprCompliant) {
        this.gdprCompliant = gdprCompliant;
    }

    public Boolean getModerationToolsEnabled() {
        return moderationToolsEnabled;
    }

    public void setModerationToolsEnabled(Boolean moderationToolsEnabled) {
        this.moderationToolsEnabled = moderationToolsEnabled;
    }

    public Integer getInterestedCount() {
        return interestedCount;
    }

    public void setInterestedCount(Integer interestedCount) {
        this.interestedCount = interestedCount;
    }

    public Integer getNotInterestedCount() {
        return notInterestedCount;
    }

    public void setNotInterestedCount(Integer notInterestedCount) {
        this.notInterestedCount = notInterestedCount;
    }

    public Integer getSomewhatInterestedCount() {
        return somewhatInterestedCount;
    }

    public void setSomewhatInterestedCount(Integer somewhatInterestedCount) {
        this.somewhatInterestedCount = somewhatInterestedCount;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }
}


