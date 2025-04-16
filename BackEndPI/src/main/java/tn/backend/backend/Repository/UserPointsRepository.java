package tn.backend.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.backend.backend.Entities.UserPoints;

import java.util.Optional;

public interface UserPointsRepository extends JpaRepository<UserPoints, Long> {
    Optional<UserPoints> findByUserId(Long userId);
}