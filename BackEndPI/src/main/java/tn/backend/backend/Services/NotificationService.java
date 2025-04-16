package tn.backend.backend.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.backend.backend.Entities.Notification;
import tn.backend.backend.Repository.NotificationRepository;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public List<Notification> getNotifications(Long communityId) {
        return notificationRepository.findByCommunityId(communityId);
    }

    public Notification createNotification(Long communityId, String message) {
        Notification notification = new Notification(communityId, message);
        return notificationRepository.save(notification);
    }

    public void markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId).orElse(null);
        if (notification != null) {
            notification.setRead(true);
            notificationRepository.save(notification);
        }
    }
}
