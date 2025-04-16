package tn.backend.backend.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.backend.backend.Entities.Post;
import tn.backend.backend.Repository.PostRepository;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // New method to get posts by community ID
    public List<Post> getPostsByCommunityId(Long communityId) {
        return postRepository.findByCommunityCommunityId(communityId);
    }

    public Post getPostById(Long id) {
        Optional<Post> post = postRepository.findById(id);
        return post.orElseThrow(() -> new RuntimeException("Post not found"));
    }

    public Post updatePost(Long id, Post updatedPost) {
        return postRepository.findById(id).map(post -> {
            post.setName(updatedPost.getName());
            post.setDescription(updatedPost.getDescription());
            post.setDateCreation(updatedPost.getDateCreation());
            post.setCategorie(updatedPost.getCategorie());
            return postRepository.save(post);
        }).orElseThrow(() -> new RuntimeException("Post not found"));
    }

    public void deletePost(Long id) {
        if (!postRepository.existsById(id)) {
            throw new RuntimeException("Post not found");
        }
        postRepository.deleteById(id);
    }
}
