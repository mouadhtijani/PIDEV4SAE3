package com.esprit.chatbot.service;

import com.esprit.chatbot.entity.Chatbot;
import com.esprit.chatbot.repo.ChatbotRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class ChatbotService {
    @Autowired
    private ChatbotRepo chatbotRepository;

    // Get answer by question
    public String getResponse(String question) {
        Optional<Chatbot> chatbot = chatbotRepository.findByQuestion(question);
        return chatbot.map(Chatbot::getAnswer).orElse("Sorry, I don't know the answer to this question.");
    }

    // Get all questions and answers
    public List<Chatbot> getAllMessages() {
        return chatbotRepository.findAll();
    }

    // Add a new question-answer pair
    public Chatbot addMessage(Chatbot chatbotMessage) {
        return chatbotRepository.save(chatbotMessage);
    }

    // Update an existing question-answer pair
    public Chatbot updateMessage(Long id, Chatbot newMessage) {
        return chatbotRepository.findById(id).map(existingMessage -> {
            existingMessage.setQuestion(newMessage.getQuestion());
            existingMessage.setAnswer(newMessage.getAnswer());
            return chatbotRepository.save(existingMessage);
        }).orElseThrow(() -> new RuntimeException("Message not found"));
    }

    // Delete a message by ID
    public void deleteMessage(Long id) {
        chatbotRepository.deleteById(id);
    }
}
