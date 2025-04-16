package tn.backend.backend.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.backend.backend.Entities.UserPoints;
import tn.backend.backend.Repository.UserPointsRepository;

@Service
public class UserPointsService {

    @Autowired
    private UserPointsRepository userPointsRepository;

    public UserPoints getUserPoints(Long userId) {
        return userPointsRepository.findByUserId(userId)
                .orElse(new UserPoints(userId));
    }

    public void addPoints(Long userId, int points) {
        UserPoints userPoints = userPointsRepository.findByUserId(userId)
                .orElse(new UserPoints(userId));
        userPoints.addPoints(points);
        userPointsRepository.save(userPoints);
    }
}