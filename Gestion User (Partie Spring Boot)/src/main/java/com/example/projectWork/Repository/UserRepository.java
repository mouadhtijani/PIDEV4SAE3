package com.example.projectWork.Repository;

import com.example.projectWork.enums.ClassLevel;
import com.example.projectWork.enums.Role;
import com.example.projectWork.enums.Speciality;
import com.example.projectWork.enums.StudentLevel;
import com.example.projectWork.models.Token;
import com.example.projectWork.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;
@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByEmail(String email);

    List<User> findAllByRole (Role role);

    List<User>  findAllByClasseLevel (ClassLevel classLevel);
    List<User> findAllByStudentLevel (StudentLevel studentLevel);
    List<User> findAllBySpecialty (Speciality speciality);

    User findByRole(Role role);
}
