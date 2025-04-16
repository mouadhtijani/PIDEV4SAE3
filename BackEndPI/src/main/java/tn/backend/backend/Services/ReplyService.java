package tn.backend.backend.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.backend.backend.Entities.Post;
import tn.backend.backend.Entities.Reply;
import tn.backend.backend.Repository.PostRepository;
import tn.backend.backend.Repository.ReplyRepository;

@Service
public class ReplyService {
	
    @Autowired
    private ReplyRepository replyRepository;

    @Autowired
    private PostRepository postRepository;
    public Reply createReply(Reply reply) {
        return replyRepository.save(reply);
    }

    public List<Reply> getAllReplies() {
        return replyRepository.findAll();
    }

    public Reply getReplyById(Long id) {
        Optional<Reply> reply = replyRepository.findById(id);
        return reply.orElseThrow(() -> new RuntimeException("Reply not found"));
    }

    public Reply updateReply(Long id, Reply updatedReply) {
        return replyRepository.findById(id).map(reply -> {
            reply.setDescription(updatedReply.getDescription());
            reply.setUserName(updatedReply.getUserName());
            return replyRepository.save(reply);
        }).orElseThrow(() -> new RuntimeException("Reply not found"));
    }

    public void deleteReply(Long id) {
        if (!replyRepository.existsById(id)) {
            throw new RuntimeException("Reply not found");
        }
        replyRepository.deleteById(id);
    }

    public List<Reply> getRepliesByPostId(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        return replyRepository.findByPost(post);
    }
}
