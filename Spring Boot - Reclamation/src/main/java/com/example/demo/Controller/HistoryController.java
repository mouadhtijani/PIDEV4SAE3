// src/main/java/com/example/demo/Controller/HistoryController.java
package com.example.demo.Controller;

import com.example.demo.Entity.HistoryEntry;
import com.example.demo.Service.ReclamationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/history")
public class HistoryController {

    @Autowired
    private ReclamationService reclamationService;

    @GetMapping
    public List<HistoryEntry> getHistory() {
        return reclamationService.getFullHistory();
    }
}
