package tn.backend.backend.Controllers;

import tn.backend.backend.Services.RagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
@CrossOrigin(origins = "http://localhost:4200")
public class RAGController {
    @Autowired
    private RagService ragService;

    @PostMapping("/rag")
    public String getRAGAnswer(@RequestBody QueryRequest queryRequest) {
        return ragService.getAnswerFromFlask(queryRequest.getQuery());
    }

    public static class QueryRequest {
        private String query;

        public String getQuery() {
            return query;
        }

        public void setQuery(String query) {
            this.query = query;
        }
    }
}
