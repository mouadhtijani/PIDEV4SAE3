package tn.backend.backend.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.backend.backend.Entities.Vote;
import tn.backend.backend.Services.VoteService;

@RestController
@RequestMapping("/votes")
public class VoteController {

    @Autowired
    private VoteService voteService;

    @PostMapping("/{postId}")
    public ResponseEntity<Void> vote(@PathVariable Long postId,
                                     @RequestParam("voteType") String voteType,
                                     @RequestParam("user") Long user) {
        voteService.castVote(postId, user, Vote.VoteType.valueOf(voteType.toUpperCase()));
        return ResponseEntity.ok().build();
    }
}