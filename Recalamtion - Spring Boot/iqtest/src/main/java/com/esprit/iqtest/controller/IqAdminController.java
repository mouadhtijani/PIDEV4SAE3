package com.esprit.iqtest.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class IqAdminController {

    private static final String CAPTURE_DIR = "iqtest/captures";
    private static final String PYTHON_AI_URL = "http://localhost:5001/analyze";

    @GetMapping("/screenshots")
    public ResponseEntity<List<Map<String, Object>>> getAllScreenshots() {
        File folder = new File(CAPTURE_DIR);
        if (!folder.exists()) return ResponseEntity.ok(List.of());

        RestTemplate restTemplate = new RestTemplate();

        List<Map<String, Object>> screenshots = Arrays.stream(Objects.requireNonNull(folder.listFiles()))
                .filter(File::isFile)
                .map(file -> {
                    Map<String, Object> result = new HashMap<>();
                    result.put("name", file.getName());
                    result.put("faceCount", 0);
                    result.put("suspicious", true); // default

                    try {
                        HttpHeaders headers = new HttpHeaders();
                        headers.setContentType(MediaType.APPLICATION_JSON);

                        Map<String, String> request = new HashMap<>();
                        request.put("filename", "captures/" + file.getName()); // Same format you use in Postman

                        HttpEntity<Map<String, String>> entity = new HttpEntity<>(request, headers);

                        ResponseEntity<Map> response = restTemplate.postForEntity(PYTHON_AI_URL, entity, Map.class);

                        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                            Object fc = response.getBody().get("face_count");
                            Object sus = response.getBody().get("suspicious");

                            result.put("faceCount", fc);
                            result.put("suspicious", sus);
                        }
                    } catch (Exception e) {
                        System.err.println("❌ Error analyzing " + file.getName() + ": " + e.getMessage());
                    }

                    return result;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(screenshots);
    }

    @DeleteMapping("/screenshots/{filename}")
    public ResponseEntity<String> deleteScreenshot(@PathVariable String filename) {
        File file = new File(CAPTURE_DIR + "/" + filename);
        if (file.exists() && file.delete()) {
            return ResponseEntity.ok("Deleted " + filename);
        }
        return ResponseEntity.status(404).body("File not found or failed to delete.");
    }
}
