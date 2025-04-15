// IqController.java (Spring Boot)
package com.esprit.iqtest.controller;

import com.esprit.iqtest.entity.IqQuestion;
import com.esprit.iqtest.entity.IqScore;
import com.esprit.iqtest.service.IqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.FileOutputStream;
import java.io.OutputStream;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api/iq")
@CrossOrigin(origins = "http://localhost:4200")
public class IqController {

    @Autowired
    private IqService iqService;

    @GetMapping("/questions")
    public List<IqQuestion> getAllQuestions() {
        return iqService.getAllQuestions();
    }

    @PostMapping("/submit")
    public ResponseEntity<Void> submitScore(@RequestBody Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.get("userId").toString());
        int score = Integer.parseInt(payload.get("score").toString());
        iqService.saveScore(userId, score);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/scores/{userId}")
    public List<IqScore> getUserScores(@PathVariable Long userId) {
        return iqService.getScoresForUser(userId);
    }

    @PostMapping("/capture")
    public ResponseEntity<String> saveScreenshot(@RequestBody Map<String, String> payload) {
        try {
            String base64Image = payload.get("image");
            Long userId = Long.parseLong(payload.get("userId"));

            if (base64Image.contains(",")) {
                base64Image = base64Image.split(",")[1];
            }

            byte[] imageBytes = Base64.getDecoder().decode(base64Image);
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd-HHmmss"));
            String fileName = "user-" + userId + "-" + timestamp + ".jpg";

            Path dir = Paths.get("iqtest", "captures");
            Files.createDirectories(dir);
            Path filePath = dir.resolve(fileName);

            try (OutputStream os = new FileOutputStream(filePath.toFile())) {
                os.write(imageBytes);
            }

            // ✅ Call Python AI cheat detector
            try {
                String pythonApiUrl = "http://localhost:5001/analyze";
                RestTemplate restTemplate = new RestTemplate();

                Map<String, String> cheatPayload = new HashMap<>();
                cheatPayload.put("filename", filePath.toAbsolutePath().toString());

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                HttpEntity<Map<String, String>> entity = new HttpEntity<>(cheatPayload, headers);

                ResponseEntity<Map> response = restTemplate.postForEntity(pythonApiUrl, entity, Map.class);
                if (response.getStatusCode().is2xxSuccessful()) {
                    Map<String, Object> result = response.getBody();
                    int faceCount = (int) result.get("face_count");
                    boolean suspicious = (boolean) result.get("suspicious");

                    System.out.println("📸 AI Detection: Faces = " + faceCount + ", Suspicious = " + suspicious);
                }
            } catch (Exception e) {
                System.err.println("AI detection failed: " + e.getMessage());
            }

            return ResponseEntity.ok("Image saved and analyzed.");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error saving image.");
        }
    }
}
