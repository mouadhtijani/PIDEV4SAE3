package tn.backend.backend.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import tn.backend.backend.Entities.Post;
import tn.backend.backend.Entities.Reply;
import tn.backend.backend.Services.PostService;
import tn.backend.backend.Services.ReplyService;

@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = "http://localhost:4200")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private ReplyService replyService;


    // Create a new Post
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        return ResponseEntity.ok(postService.createPost(post));
    }

    // Get all Posts
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    // Get a Post by ID
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getPostById(id));
    }

    // Get Posts by Community ID
    @GetMapping("/community/{communityId}")
    public ResponseEntity<List<Post>> getPostsByCommunityId(@PathVariable Long communityId) {
        return ResponseEntity.ok(postService.getPostsByCommunityId(communityId));
    }

    // Update a Post by ID
    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post updatedPost) {
        return ResponseEntity.ok(postService.updatePost(id, updatedPost));
    }

    // Delete a Post by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{postId}/replies")
    public ResponseEntity<List<Reply>> getCommentsByPostId(@PathVariable Long postId) {
        List<Reply> comments = replyService.getRepliesByPostId(postId);
        return ResponseEntity.ok(comments);
    }

}
