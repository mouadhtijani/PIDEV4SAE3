package com.example.projectWork.serviceImplementation;

import com.example.projectWork.Repository.UserRepository;
import com.example.projectWork.models.History;
import com.example.projectWork.models.User;
import com.example.projectWork.Repository.HistoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.projectWork.enums.Role;

@Service
@RequiredArgsConstructor
@Slf4j
public class HistoryService {

    private final HistoryRepository historyRepository;
    private final UserRepository userRepository; // Ajouter cette ligne

    @Transactional
    public void logAction(String action) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        // Ajouter une méthode findByEmail dans UserRepository
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        History history = new History();
        history.setAction(action);
        history.setUser(user); // Liaison via l'objet User

        historyRepository.save(history);
        log.info("Action logged: {} - {}", email, action);
    }

    public Page<History> getHistoryByRole(Role role, Pageable pageable) {
        return historyRepository.findByUserRole(role, pageable);
    }
}