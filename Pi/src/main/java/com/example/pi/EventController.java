package com.example.pi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.RestTemplate;
import org.springframework.util.StringUtils;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:4200") // Allow requests from Angular app
public class EventController {

    @Autowired
    private EventService eventService;

    private static final String GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";  // Replace with your Google Maps API key
    private static final String GEOCODE_API_URL = "https://maps.googleapis.com/maps/api/geocode/json?address=";

    // ✅ Get all events, including location data (latitude, longitude)
    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventService.getAllEvents();

        for (Event event : events) {
            // If the event doesn't have coordinates, fetch them using the location string
            if (event.getLatitude() == null || event.getLongitude() == null) {
                String location = event.getLocation();
                if (StringUtils.hasText(location)) {
                    fetchAndSetCoordinates(event, location);
                }
            }
        }

        return ResponseEntity.ok(events);
    }

    // Method to fetch coordinates (latitude and longitude) from Google Maps Geocoding API
    private void fetchAndSetCoordinates(Event event, String location) {
        String geocodeUrl = GEOCODE_API_URL + location + "&key=" + GOOGLE_MAPS_API_KEY;
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(geocodeUrl, String.class);

        // Here you should parse the response to extract latitude and longitude (this could be a full JSON parsing step)
        // For the sake of simplicity, we'll assume the latitude and longitude are returned correctly (you should parse this properly)

        // Example: Mock response (replace with actual parsing of JSON response)
        event.setLatitude(40.7128);  // Mock latitude for New York
        event.setLongitude(-74.0060); // Mock longitude for New York
    }

    // ✅ Create an event
    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        try {
            if (event.getLatitude() == null || event.getLongitude() == null) {
                String location = event.getLocation();
                if (StringUtils.hasText(location)) {
                    fetchAndSetCoordinates(event, location);  // Fetch and set coordinates from location
                }
            }
            Event createdEvent = eventService.createEvent(event);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdEvent);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // ✅ Update an event
    @PutMapping("/{eventId}")
    public Event updateEvent(@PathVariable Long eventId, @RequestBody Event event) {
        return eventService.updateEvent(eventId, event);
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long eventId) {
        try {
            eventService.deleteEvent(eventId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (EventService.ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // ✅ React to an event
    @PostMapping("/{eventId}/react")
    public ResponseEntity<?> reactToEvent(@PathVariable Long eventId, @RequestParam String reaction) {
        try {
            eventService.reactToEvent(eventId, reaction);
            return ResponseEntity.ok("Reaction added successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid reaction type");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found");
        }
    }

    // ✅ Exception Handler (Handles `ResourceNotFoundException` globally)
    @ExceptionHandler(EventService.ResourceNotFoundException.class)
    public ResponseEntity<String> handleNotFoundException(EventService.ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    // ✅ Inner class for reaction request (Improves API structure)
    public static class ReactionRequest {
        private String reaction;

        public String getReaction() {
            return reaction;
        }

        public void setReaction(String reaction) {
            this.reaction = reaction;
        }
    }
}
