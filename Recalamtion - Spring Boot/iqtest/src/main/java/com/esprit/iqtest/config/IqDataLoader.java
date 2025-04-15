package com.esprit.iqtest.config;

import com.esprit.iqtest.entity.IqQuestion;
import com.esprit.iqtest.repo.IqQuestionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class IqDataLoader implements CommandLineRunner {

    private final IqQuestionRepository questionRepository;

    public IqDataLoader(IqQuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @Override
    public void run(String... args) {

        if (questionRepository.count() == 0) {
            List<IqQuestion> questions = List.of(
                    createQuestion("Which annotation is used to mark a class as a Spring Boot application?", List.of("@EnableAutoConfiguration", "@SpringBootApplication", "@ComponentScan", "@Configuration"), 1),
                    createQuestion("What does ngOnInit() do in Angular?", List.of("Handles form submission", "Initializes input bindings", "Runs after the constructor", "Sends HTTP request"), 2),
                    createQuestion("Which lifecycle hook is called after every change in Angular?", List.of("ngOnInit", "ngDoCheck", "ngAfterViewInit", "ngChanges"), 1),
                    createQuestion("What is the default port for Spring Boot applications?", List.of("3000", "4200", "8080", "8000"), 2),
                    createQuestion("Which directive in Angular is used for looping?", List.of("*ngFor", "*ngIf", "*ngSwitch", "ngModel"), 0),
                    createQuestion("What does @RestController combine?", List.of("@Controller + @ResponseBody", "@Service + @RequestMapping", "@Bean + @RequestBody", "@Entity + @PathVariable"), 0),
                    createQuestion("Which class is used to run a Spring Boot app?", List.of("ApplicationRunner", "CommandLineRunner", "SpringApplication", "BootApp"), 2),
                    createQuestion("What does HttpClient in Angular return?", List.of("Promise", "Observable", "EventEmitter", "Subject"), 1),
                    createQuestion("Which Angular decorator is used to bind properties from parent to child?", List.of("@Injectable", "@Output", "@Input", "@Directive"), 2),
                    createQuestion("In Spring, what annotation is used for dependency injection?", List.of("@Autowired", "@Bean", "@Inject", "@Component"), 0),
                    createQuestion("What is the role of package.json in Angular?", List.of("Manages project config", "Defines Java packages", "Tracks npm dependencies", "Serves as Angular module"), 2),
                    createQuestion("Which HTTP method is idempotent?", List.of("POST", "PUT", "PATCH", "DELETE"), 1),
                    createQuestion("What is the purpose of *ngIf?", List.of("Looping items", "Conditional rendering", "Two-way binding", "Routing"), 1),
                    createQuestion("What file contains Spring Boot’s app port config?", List.of("pom.xml", "application.properties", "config.yml", "boot.json"), 1),
                    createQuestion("How do you create a service in Angular CLI?", List.of("ng generate component", "ng create service", "ng make service", "ng generate service"), 3),
                    createQuestion("Which component handles incoming web requests in Spring?", List.of("Repository", "Entity", "Controller", "Service"), 2),
                    createQuestion("What is the command to serve an Angular project?", List.of("npm run dev", "ng serve", "ng start", "ng build"), 1),
                    createQuestion("In Spring Boot, what does @Entity represent?", List.of("A controller", "A database table", "A DTO", "A service"), 1),
                    createQuestion("What CLI command creates a new Angular app?", List.of("ng new", "npm install", "ng build", "angular init"), 0),
                    createQuestion("Which annotation in Spring maps HTTP GET requests?", List.of("@RequestBody", "@GetMapping", "@PostMapping", "@PutMapping"), 1)
            );

            questionRepository.saveAll(questions);
            System.out.println("✅ 20 Developer IQ questions loaded into the database.");
        }
    }

    private IqQuestion createQuestion(String question, List<String> options, int correctAnswer) {
        IqQuestion iq = new IqQuestion();
        iq.setQuestion(question);
        iq.setOptions(options);
        iq.setCorrectAnswer(correctAnswer);
        return iq;
    }
}
