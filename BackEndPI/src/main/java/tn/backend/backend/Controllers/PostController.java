package tn.backend.backend.Controllers;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import tn.backend.backend.Entities.Post;
import tn.backend.backend.Entities.Reply;
import tn.backend.backend.Services.ImageDetectionService;
import tn.backend.backend.Services.NotificationService;
import tn.backend.backend.Services.PostService;
import tn.backend.backend.Services.ReplyService;

@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = "http://localhost:4200")
public class PostController {

    @Autowired
    private PostService postService;
    @Autowired
    private ImageDetectionService imageDetectionService;

    @Autowired
    private ReplyService replyService;

    @Autowired
    private NotificationService notificationService;

    // Create a new Post
//    @PostMapping
//    public ResponseEntity<Post> createPost(@RequestBody Post post) {
//
//        String message = "A new post has been created in your community: " + post.getName();
//        notificationService.createNotification(post.getCommunity().getCommunityId(),message);
//
//        return ResponseEntity.ok(postService.createPost(post));
//    }
    @PostMapping("/addPost")
    public ResponseEntity<?> createPost(@RequestParam("file") MultipartFile file,
                                        @RequestParam("postData") String postData) {
        String UPLOAD_DIR = "uploads/";

        try {
            // Ensure the upload directory exists
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate a unique filename
            String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
            String newFilename = UUID.randomUUID() + "_" + originalFilename;


            // Save the file
            Path filePath = uploadPath.resolve(newFilename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Deserialize the post data
            Post post = new ObjectMapper().readValue(postData, Post.class);
            post.setImg(newFilename);  // Set the full URL for the image


            // 🔥 OPTIONAL: Call Flask Sentiment API
            try {
                RestTemplate restTemplate = new RestTemplate();
                String flaskUrl = "http://localhost:5001/analyze";

                Map<String, String> request = new HashMap<>();
                request.put("text", post.getDescription());

                ResponseEntity<Map> response = restTemplate.postForEntity(flaskUrl, request, Map.class);

                if (response.getStatusCode().is2xxSuccessful()) {
                    String sentiment = (String) response.getBody().get("sentiment");
                    post.setSentiment(sentiment);
                    System.out.println("Sentiment from Flask: " + sentiment);
                } else {
                    System.out.println("Flask sentiment API returned non-200 status.");
                }
            } catch (Exception e) {
                System.out.println("Error calling Flask API: " + e.getMessage());
            }

            // Call Image Detection Service to analyze the uploaded image
            String imageDetectionResult = imageDetectionService.detectImage(filePath.toString());
            post.setDescription(post.getDescription() + "\n\nImage Detection Result: " + imageDetectionResult);

            // Send notification (optional)
            String message = "A new post has been created in your community: " + post.getName();
            notificationService.createNotification(post.getCommunity().getCommunityId(), message);

            // Save the post
            Post createdPost = postService.createPost(post);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating post");
        }
    }





    // Get all Posts
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        try {
            List<Post> posts =postService.getAllPosts();
            return ResponseEntity.status(HttpStatus.OK).body(posts);
        }catch (Exception e){

        return ResponseEntity.ok(postService.getAllPosts());
    }
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
