// src/main/java/com/example/demo/Controller/AdminReclamationController.java
package com.example.demo.Controller;

import com.example.demo.Entity.Reclamation;
import com.example.demo.Service.ReclamationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/admin/reclamations")
public class AdminReclamationController {

    @Autowired
    private ReclamationService service;

    @GetMapping
    public List<Reclamation> getAllReclamations() {
        return service.getAllReclamations();
    }

    @PutMapping("/{id}/response")
    public Reclamation updateResponse(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {

        String adminResponse = request.get("response");
        return service.updateAdminResponse(id, adminResponse);
    }

    @GetMapping("/history/export")
    public ResponseEntity<byte[]> exportHistoryToExcel() throws IOException {
        byte[] excelData = service.exportHistoryToExcel();  // Fetch the Excel data

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=history.xlsx");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(org.springframework.http.MediaType.APPLICATION_OCTET_STREAM)
                .body(excelData);  // Send the Excel file as byte array
    }


}
