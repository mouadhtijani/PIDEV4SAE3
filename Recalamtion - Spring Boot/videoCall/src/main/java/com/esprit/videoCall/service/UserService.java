package com.esprit.videoCall.service;

import com.esprit.videoCall.entity.User;
import com.esprit.videoCall.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepository;

    public User registerUser(String username, String peerId) {
        User user = new User();
        user.setUsername(username);
        user.setPeerId(peerId);
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}