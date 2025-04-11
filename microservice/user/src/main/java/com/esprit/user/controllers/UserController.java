    package com.esprit.user.controllers;

    import com.esprit.user.dto.StudentDetailsRequest;
    import com.esprit.user.enums.ClassLevel;
    import com.esprit.user.enums.Role;
    import com.esprit.user.enums.Speciality;
    import com.esprit.user.enums.StudentLevel;
    import com.esprit.user.interfaces.IUserService;
    import com.esprit.user.models.User;
    import org.springframework.format.annotation.DateTimeFormat;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;
    import org.springframework.web.multipart.MultipartFile;

    import java.io.IOException;
    import java.time.LocalDate;
    import java.util.List;
    import java.util.Optional;

    @RestController
    @RequestMapping("/api/v1/user")
    @CrossOrigin("*")
    public class UserController {

        private final IUserService iuserService;

        // ✅ Constructor Injection (If @RequiredArgsConstructor isn't working)
        public UserController(IUserService iuserService) {
            this.iuserService = iuserService;
        }

        @GetMapping("/{id_user}")
        public Optional<User> findUserById(@PathVariable int id_user) {
            return iuserService.findUserById(id_user);
        }

        @GetMapping("/student")
        public Optional<User> findUserByEmail(@RequestParam("email") String email) {
            return iuserService.findUserByEmail(email);
        }

        @GetMapping("/token")
        public Optional<User> findUserByToken(@RequestParam("token") String token) {
            return iuserService.findUserByToken(token);
        }

        @PutMapping("/student/{id_user}")
        public ResponseEntity<User> setStudentProfile(
                @PathVariable int id_user,
                @RequestParam("birthdate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate birthdate,
                @RequestParam("level") StudentLevel level,
                @RequestParam("classe") ClassLevel classe,
                @RequestParam("studentCV") MultipartFile studentCV,
                @RequestParam("speciality") Speciality speciality) throws IOException {

            Optional<User> exitUser = iuserService.findUserById(id_user);

            if (exitUser.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                StudentDetailsRequest request = new StudentDetailsRequest();
                request.setBirthdate(birthdate);
                request.setLevel(level);
                request.setClasse(classe);
                request.setStudentCV(studentCV.getBytes());
                request.setSpecialty(speciality);

                return iuserService.setStudentProfile(id_user, request);
            }
        }

        @GetMapping("/role/{role}")
        public List<User> getAllUserByRole(@PathVariable Role role) {
            return iuserService.getAllUserByRole(role);
        }

        @GetMapping("/classe-level/{classLevel}")
        public List<User> getAllUserByClasseLevel(@PathVariable ClassLevel classLevel) {
            return iuserService.getAllUserByClasseLevel(classLevel);
        }

        @GetMapping("/student-level/{studentlevel}")
        public List<User> getAllUserByStudentLevel(@PathVariable StudentLevel studentlevel) {
            return iuserService.getAllUserByStudentLevel(studentlevel);
        }

        @GetMapping("/speciality/{speciality}")
        public List<User> getAllUserBySpeciality(@PathVariable Speciality speciality) {
            return iuserService.getAllUserBySpeciality(speciality);
        }

        @PutMapping("/set-image/")
        @ResponseStatus(HttpStatus.OK)
        private void setUserImage(@RequestParam("id_user") int id_user, @RequestParam("userImage") MultipartFile image) throws IOException {
            iuserService.setUserImage(id_user, image);
        }

        @GetMapping()
        public List<User> getAllUser() {
            return iuserService.getAllUser();
        }
    }
