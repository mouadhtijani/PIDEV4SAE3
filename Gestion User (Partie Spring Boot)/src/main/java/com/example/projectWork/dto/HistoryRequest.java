package com.example.projectWork.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class HistoryRequest {
    private String action;
    private String userEmail;
    private LocalDateTime timestamp;
}