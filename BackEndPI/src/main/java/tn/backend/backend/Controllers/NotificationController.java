package tn.backend.backend.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.backend.backend.Entities.Notification;
import tn.backend.backend.Services.NotificationService;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;
    @GetMapping
    public List<Notification> getNotifications(@RequestParam Long communityId) {
        return notificationService.getNotifications(communityId);
    }

    @PostMapping
    public Notification createNotification(@RequestParam Long communityId, @RequestParam String message) {
        return notificationService.createNotification(communityId, message);
    }

    @PutMapping("/read/{id}")
    public void markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
    }
}
