package tn.backend.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.backend.backend.Entities.Community;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Long> {}
