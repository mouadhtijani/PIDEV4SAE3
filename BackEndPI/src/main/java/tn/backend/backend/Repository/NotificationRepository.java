package tn.backend.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.backend.backend.Entities.Notification;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByCommunityId(Long communityId);
}
