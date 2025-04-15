package com.example.pi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    private static final String GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";  // Replace with your Google Maps API key
    private static final String GEOCODE_API_URL = "https://maps.googleapis.com/maps/api/geocode/json?address=";

    // Récupérer tous les événements
    public List<Event> getAllEvents() {
        List<Event> events = eventRepository.findAll();

        // Fetch coordinates for events that do not have them
        for (Event event : events) {
            if (event.getLatitude() == null || event.getLongitude() == null) {
                String location = event.getLocation();
                if (StringUtils.hasText(location)) {
                    fetchAndSetCoordinates(event, location);
                }
            }
        }

        return events;
    }

    // Créer un événement
    public Event createEvent(Event event) {
        if (event.getTitle() == null || event.getTitle().isEmpty()) {
            throw new IllegalArgumentException("Title cannot be empty");
        }

        // Fetch coordinates if not present
        if (event.getLatitude() == null || event.getLongitude() == null) {
            String location = event.getLocation();
            if (StringUtils.hasText(location)) {
                fetchAndSetCoordinates(event, location);
            }
        }

        return eventRepository.save(event);
    }

    // Mettre à jour un événement
    public Event updateEvent(Long eventId, Event eventDetails) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id " + eventId));

        if (eventDetails.getTitle() == null || eventDetails.getTitle().isEmpty()) {
            throw new IllegalArgumentException("Title cannot be empty");
        }

        event.setTitle(eventDetails.getTitle());
        event.setDescription(eventDetails.getDescription());

        // Fetch coordinates if not present
        if (eventDetails.getLatitude() == null || eventDetails.getLongitude() == null) {
            String location = eventDetails.getLocation();
            if (StringUtils.hasText(location)) {
                fetchAndSetCoordinates(event, location);
            }
        }

        return eventRepository.save(event);
    }

    // Method to fetch latitude and longitude using Google Maps Geocoding API
    private void fetchAndSetCoordinates(Event event, String location) {
        String geocodeUrl = GEOCODE_API_URL + location + "&key=" + GOOGLE_MAPS_API_KEY;
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(geocodeUrl, String.class);

        // Use Jackson or any JSON library to parse the response and extract latitude/longitude
        // Example:
        // ObjectMapper mapper = new ObjectMapper();
        // JsonNode jsonNode = mapper.readTree(response);
        // event.setLatitude(jsonNode.get("results").get(0).get("geometry").get("location").get("lat").asDouble());
        // event.setLongitude(jsonNode.get("results").get(0).get("geometry").get("location").get("lng").asDouble());

        // Mocked response for simplicity, replace this with actual JSON parsing
        event.setLatitude(40.7128);  // Mock latitude for New York
        event.setLongitude(-74.0060); // Mock longitude for New York
    }

    // Exception personnalisée
    public static class ResourceNotFoundException extends RuntimeException {
        public ResourceNotFoundException(String message) {
            super(message);
        }
    }

    public void deleteEvent(Long id) {
        if (!eventRepository.existsById(id)) {
            throw new ResourceNotFoundException("Event not found with id " + id);
        }
        eventRepository.deleteById(id);
    }

    public void reactToEvent(Long eventId, String reaction) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id " + eventId));

        switch (reaction.toLowerCase()) {
            case "interested":
                event.setInterestedCount(event.getInterestedCount() + 1);
                break;
            case "not_interested":
                event.setNotInterestedCount(event.getNotInterestedCount() + 1);
                break;
            case "slightly_interested":
                event.setSomewhatInterestedCount(event.getSomewhatInterestedCount() + 1);
                break;
            default:
                throw new IllegalArgumentException("Invalid reaction type");
        }

        eventRepository.save(event);
    }
}
