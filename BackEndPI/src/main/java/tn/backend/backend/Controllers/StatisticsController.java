package tn.backend.backend.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.backend.backend.Services.StatisticsService;

@RestController
@RequestMapping("/statistics")
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    // Endpoint to get the number of threads in a community
    @GetMapping("/threads/{communityId}")
    public long getNumberOfThreads(@PathVariable Long communityId) {
        return statisticsService.getNumberOfThreads(communityId);
    }

    // Endpoint to get the number of posts (replies) in a community
    @GetMapping("/posts/{communityId}")
    public long getNumberOfPosts(@PathVariable Long communityId) {
        return statisticsService.getNumberOfPosts(communityId);
    }

    // Endpoint to get the total number of communities
    @GetMapping("/communities")
    public long getNumberOfCommunities() {
        return statisticsService.getNumberOfCommunities();
    }

    // Endpoint to get the total number of posts (across all communities)
    @GetMapping("/posts")
    public long getTotalNumberOfPosts() {
        return statisticsService.getNumberOfPosts();
    }
}
