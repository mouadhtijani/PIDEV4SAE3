package com.example.projectWork.controllers;

import com.example.projectWork.models.History;
import com.example.projectWork.serviceImplementation.HistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.projectWork.enums.Role; // Ajouter cet import

@RestController
@RequestMapping("/api/history")
@RequiredArgsConstructor
public class HistoryController {

    private final HistoryService historyService; // Ajouter cette ligne

    @GetMapping("/by-role")
    public ResponseEntity<Page<History>> getHistoryByRole(
            @RequestParam("role") Role role,
            Pageable pageable) {
        return ResponseEntity.ok(historyService.getHistoryByRole(role, pageable));
    }
}