package com.esprit.user.interfaces;

import com.esprit.user.dto.StudentDetailsRequest;
import com.esprit.user.enums.ClassLevel;
import com.esprit.user.enums.Role;
import com.esprit.user.enums.Speciality;
import com.esprit.user.enums.StudentLevel;
import com.esprit.user.models.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface IUserService {
    ResponseEntity<User> setStudentProfile(int id_user, StudentDetailsRequest studentDetailsRequest);

    Optional<User> findUserById(int idUser);

    List<User> getAllUserByRole(Role role);

    List<User> getAllUserBySpeciality(Speciality speciality);

    List<User> getAllUserByStudentLevel(StudentLevel studentlevel);

    List<User> getAllUserByClasseLevel(ClassLevel classLevel);

    void setUserImage(int idUser, MultipartFile image) throws IOException;

    Optional<User> findUserByEmail(String email);

    Optional<User> findUserByToken(String token);

    List<User> getAllUser();
}
