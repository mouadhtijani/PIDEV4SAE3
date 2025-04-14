package com.esprit.chatbot.repo;

import com.esprit.chatbot.entity.Chatbot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface ChatbotRepo extends JpaRepository<Chatbot,Long> {
    Optional<Chatbot> findByQuestion(String question);

}
