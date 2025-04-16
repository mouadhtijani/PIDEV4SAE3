package tn.backend.backend.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.backend.backend.Entities.UserPoints;
import tn.backend.backend.Services.UserPointsService;

@RestController
@RequestMapping("/user-points")
public class UserPointsController {

    @Autowired
    private UserPointsService userPointsService;

    @GetMapping("/{userId}")
    public ResponseEntity<UserPoints> getUserPoints(@PathVariable Long userId) {
        UserPoints userPoints = userPointsService.getUserPoints(userId);
        return ResponseEntity.ok(userPoints);
    }
}