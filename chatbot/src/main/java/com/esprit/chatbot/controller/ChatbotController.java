package com.esprit.chatbot.controller;

import com.esprit.chatbot.entity.Chatbot;
import com.esprit.chatbot.service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chatbot")
@CrossOrigin(origins = "http://localhost:4200")
public class ChatbotController {

    @Autowired
    private ChatbotService chatbotService;

    // Get answer by question
    @GetMapping("/ask")
    public String getResponse(@RequestParam String question) {
        return chatbotService.getResponse(question);
    }

    // Get all questions and answers
    @GetMapping("/messages")
    public List<Chatbot> getAllMessages() {
        return chatbotService.getAllMessages();
    }

    // Add a new question-answer pair
    @PostMapping("/add")
    public Chatbot addMessage(@RequestBody Chatbot chatbotMessage) {
        return chatbotService.addMessage(chatbotMessage);
    }

    // Update an existing message
    @PutMapping("/update/{id}")
    public Chatbot updateMessage(@PathVariable Long id, @RequestBody Chatbot chatbotMessage) {
        return chatbotService.updateMessage(id, chatbotMessage);
    }

    // Delete a message by ID
    @DeleteMapping("/delete/{id}")
    public void deleteMessage(@PathVariable Long id) {
        chatbotService.deleteMessage(id);
    }
}