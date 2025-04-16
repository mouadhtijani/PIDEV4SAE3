package tn.backend.backend.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.backend.backend.Entities.Post;
import tn.backend.backend.Entities.Vote;
import tn.backend.backend.Repository.PostRepository;
import tn.backend.backend.Repository.VoteRepository;

import java.util.Optional;

@Service
public class VoteService {

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserPointsService userPointsService;
    @Transactional
    public void castVote(Long postId, Long userId, Vote.VoteType voteType) {
        Long user = userId;
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));

        Optional<Vote> existingVote = voteRepository.findByUserAndPost(user, post);

        if (existingVote.isPresent()) {
            Vote vote = existingVote.get();
            if (vote.getVoteType() != voteType) {
                vote.setVoteType(voteType);
                voteRepository.save(vote);
            }
        } else {
            Vote newVote = new Vote();
            newVote.setUser(user);
            newVote.setPost(post);
            newVote.setVoteType(voteType);
            userPointsService.addPoints(post.getUserId(), 1);
            voteRepository.save(newVote);
        }

        post.setVoteCount(calculateVoteCount(post));
        postRepository.save(post);
    }

    private int calculateVoteCount(Post post) {
        long upvotes = voteRepository.countByPostAndVoteType(post, Vote.VoteType.UP);
        long downvotes = voteRepository.countByPostAndVoteType(post, Vote.VoteType.DOWN);
        return (int) (upvotes - downvotes);
    }
}