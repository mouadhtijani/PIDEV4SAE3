package tn.backend.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.backend.backend.Entities.Post;
import tn.backend.backend.Entities.Vote;

import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    Optional<Vote> findByUserAndPost(Long user, Post post);
    long countByPostAndVoteType(Post post, Vote.VoteType voteType);
}