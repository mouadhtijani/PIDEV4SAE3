package tn.backend.backend.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import tn.backend.backend.Entities.Reply;
import tn.backend.backend.Services.ReplyService;

@RestController
@RequestMapping("/replies")
public class ReplyController {
	
    @Autowired
    private ReplyService replyService;

    @PostMapping
    public ResponseEntity<Reply> createReply(@RequestBody Reply reply) {
        System.out.println(reply);
        return ResponseEntity.ok(replyService.createReply(reply));
    }

    @GetMapping
    public ResponseEntity<List<Reply>> getAllReplies() {
        return ResponseEntity.ok(replyService.getAllReplies());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reply> getReplyById(@PathVariable Long id) {
        return ResponseEntity.ok(replyService.getReplyById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reply> updateReply(@PathVariable Long id, @RequestBody Reply reply) {
        return ResponseEntity.ok(replyService.updateReply(id, reply));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReply(@PathVariable Long id) {
        replyService.deleteReply(id);
        return ResponseEntity.noContent().build();
    }
}
