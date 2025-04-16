package tn.backend.backend.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.backend.backend.Entities.Community;
import tn.backend.backend.Entities.Post;
import tn.backend.backend.Repository.CommunityRepository;
import tn.backend.backend.Repository.PostRepository;

import java.util.List;

@Service
public class StatisticsService {

    @Autowired
    private CommunityRepository communityRepository;

    @Autowired
    private PostRepository postRepository;

    // Get the total number of communities
    public long getNumberOfCommunities() {
        return communityRepository.count();  // Returns the total count of communities
    }

    // Get the total number of posts across all communities
    public long getNumberOfPosts() {
        List<Post> posts = postRepository.findAll();  // Fetches all posts across all communities
        return posts.size();  // Return the total count of posts
    }

    // Get the number of threads (posts) for a specific community
    public long getNumberOfThreads(Long communityId) {
        Community community = communityRepository.findById(communityId).orElse(null);
        if (community != null) {
            return community.getPosts().size();  // Return the count of posts (threads) for the community
        }
        return 0;  // If community is not found, return 0
    }

    // Get the total number of posts (including replies) for a specific community
    public long getNumberOfPosts(Long communityId) {
        List<Post> posts = postRepository.findByCommunityCommunityId(communityId);
        long totalReplies = 0;
        for (Post post : posts) {
            totalReplies += post.getReplies().size();  // Count all replies for each post
        }
        return posts.size() + totalReplies;  // Return the total posts + replies count
    }
}
