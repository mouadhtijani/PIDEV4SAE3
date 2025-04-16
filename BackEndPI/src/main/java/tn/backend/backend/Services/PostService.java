package tn.backend.backend.Services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.backend.backend.Entities.Post;
import tn.backend.backend.Repository.PostRepository;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.HashMap;
import java.util.Map;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserPointsService userPointsService;

//    public Post createPost(Post post) {
//        post.setDateCreation(LocalDate.now());
//        post.setUserId(post.getUserId());
//        Post savedPost = postRepository.save(post);
//
//        userPointsService.addPoints(post.getUserId(), 5);
//
//        return savedPost;
//    }
public Post createPost(Post post) {
    post.setDateCreation(LocalDate.now());
    post.setUserId(post.getUserId());

    // Analyze sentiment BEFORE saving
    String sentiment = analyzeSentiment(post.getDescription());
    System.out.println("sentiment is " + sentiment);
    post.setSentiment(sentiment);

    Post savedPost = postRepository.save(post);

    userPointsService.addPoints(post.getUserId(), 5);

    return savedPost;
}

    private String analyzeSentiment(String text) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:5001/analyze"; // url flask (serveur pour les fcts python)

        Map<String, String> request = new HashMap<>();
        request.put("text", text);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, String>> entity = new HttpEntity<>(request, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);
            System.out.println("sentiment:   a"  + response.getBody().get("sentiment"));
            return response.getBody().get("sentiment").toString();
        } catch (Exception e) {
            return "Neutral"; // fallback
        }
    }


    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

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
            post.setDateCreation(LocalDate.now());
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