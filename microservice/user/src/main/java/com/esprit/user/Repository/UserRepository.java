package com.esprit.user.Repository;

import com.esprit.user.enums.ClassLevel;
import com.esprit.user.enums.Role;
import com.esprit.user.enums.Speciality;
import com.esprit.user.enums.StudentLevel;
import com.esprit.user.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByEmail(String email);

    List<User> findAllByRole (Role role);

    List<User>  findAllByClasseLevel (ClassLevel classLevel);
    List<User> findAllByStudentLevel (StudentLevel studentLevel);
    List<User> findAllBySpecialty (Speciality speciality);

    User findByRole(Role role);
}
