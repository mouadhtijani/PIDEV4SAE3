package com.example.projectWork.interfaces;

import com.example.projectWork.dto.StudentDetailsRequest;
import com.example.projectWork.enums.ClassLevel;
import com.example.projectWork.enums.Role;
import com.example.projectWork.enums.Speciality;
import com.example.projectWork.enums.StudentLevel;
import com.example.projectWork.models.User;
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
