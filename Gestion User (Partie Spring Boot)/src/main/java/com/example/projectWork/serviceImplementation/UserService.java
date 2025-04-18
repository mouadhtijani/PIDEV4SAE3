package com.example.projectWork.serviceImplementation;

import com.example.projectWork.Repository.TokenRepository;
import com.example.projectWork.Repository.UserRepository;
import com.example.projectWork.dto.StudentDetailsRequest;
import com.example.projectWork.enums.ClassLevel;
import com.example.projectWork.enums.Role;
import com.example.projectWork.enums.Speciality;
import com.example.projectWork.enums.StudentLevel;
import com.example.projectWork.interfaces.IUserService;
import com.example.projectWork.models.Token;
import com.example.projectWork.models.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Optional<User> findUserById(int idUser) {
        return userRepository.findById(idUser);
    }

    @Override
    public List<User> getAllUserByRole(Role role) {
        return userRepository.findAllByRole(role)  ;
    }

    @Override
    public List<User> getAllUserBySpeciality(Speciality speciality) {
        return userRepository.findAllBySpecialty(speciality);
    }

    @Override
    public List<User> getAllUserByStudentLevel(StudentLevel studentlevel) {
        return userRepository.findAllByStudentLevel(studentlevel);
    }

    @Override
    public List<User> getAllUserByClasseLevel(ClassLevel classLevel) {
        return userRepository.findAllByClasseLevel(classLevel);
    }

    @Override
    public void setUserImage(int idUser, MultipartFile image) throws IOException {
        User user = userRepository.findById(idUser).orElseThrow(()->new RuntimeException("User NOT FOUND "));
        user.setUserImage(image.getBytes());
        userRepository.save(user);
    }

    @Override
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findUserByToken(String token) {
        Token myToken = tokenRepository.findByToken(token).orElseThrow(()-> new RuntimeException("Invalide Token"));
        return userRepository.findById(myToken.getUser().getUserId());
    }

    @Override
    public List<User> getAllUser() {
return userRepository.findAll();    }


    @Override
    public ResponseEntity<User> setStudentProfile(int id_user, StudentDetailsRequest request) {
        User user=userRepository.findById(id_user).get();
        user.setBirthdate(request.getBirthdate());
        user.setStudentLevel(request.getLevel());
        user.setStudentCV(request.getStudentCV());
        user.setSpecialty(request.getSpecialty());
        user.setUserImage(user.getUserImage());
        user.setClasseLevel(request.getClasse());
        userRepository.save(user);
        return new ResponseEntity<>(user, HttpStatus.OK);

    }
    @EventListener
    public void onApplicationEvent(ContextRefreshedEvent event) {
        createAdminAccount();
    }

    public void createAdminAccount(){
        User adminAccount = userRepository.findByRole(Role.ADMIN);
        if(adminAccount==null) {
            adminAccount = new User();
            adminAccount.setFirstName("admin");
            adminAccount.setLastName("admin");
            adminAccount.setEmail("admin@gmail.com");
            adminAccount.setPassword(passwordEncoder.encode("adminadmin"));
            adminAccount.setClasseLevel(null);
            adminAccount.setStudentLevel(null);
            adminAccount.setRole(Role.ADMIN);
            adminAccount.setSpecialty(null);
            adminAccount.setEnabled(true);

            userRepository.save(adminAccount);
        }
        log.info("admin account created successfuly");

    }


}
