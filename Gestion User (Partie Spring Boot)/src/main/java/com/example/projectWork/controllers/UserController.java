package com.example.projectWork.controllers;
import com.example.projectWork.dto.StudentDetailsRequest;
import com.example.projectWork.enums.ClassLevel;
import com.example.projectWork.enums.Role;
import com.example.projectWork.enums.Speciality;
import com.example.projectWork.enums.StudentLevel;
import com.example.projectWork.interfaces.IUserService;
import com.example.projectWork.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Optional;
import java.util.List;
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/v1/user")
public class UserController {

    private final IUserService iuserService;

    @GetMapping("/{id_user}")
    public Optional<User> findUserById(@PathVariable int id_user){
        return iuserService.findUserById(id_user);
    }
    @GetMapping("/student")
    public Optional<User> findUserByEmail(@RequestParam("email") String email){
        return iuserService.findUserByEmail(email);
    }
    @GetMapping("/token")
    public Optional<User> findUserByToken(@RequestParam("token") String token){
        return iuserService.findUserByToken(token);
    }
    //must test that this is a student
    @PutMapping("/student/{id_user}")
    public ResponseEntity<User> setStudentProfile(@PathVariable int id_user, @RequestParam("birthdate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate birthdate, @RequestParam("level") StudentLevel level, @RequestParam("classe") ClassLevel classe, @RequestParam("studentCV")MultipartFile studentCV, @RequestParam("speciality")Speciality speciality) throws IOException {
        Optional<User> exitUser = iuserService.findUserById(id_user);
        if(exitUser.isEmpty()){
            return new ResponseEntity <>(HttpStatus.NOT_FOUND);
        }else{
            StudentDetailsRequest request = StudentDetailsRequest
                    .builder()
                    .birthdate(birthdate)
                    .level(level)
                    .classe(classe)
                    .studentCV(studentCV.getBytes())
                    .specialty(speciality)
                    .build();
            return iuserService.setStudentProfile(id_user,request);
        }
    }
    @GetMapping("/role/{role}")
    public List<User> getAllUserByRole(@PathVariable Role role){
        return iuserService.getAllUserByRole(role);
    }
    @GetMapping("/classe-level/{classLevel}")
    public List<User> getAllUserByClasseLevel(@PathVariable ClassLevel classLevel){
        return iuserService.getAllUserByClasseLevel(classLevel);
    }
    @GetMapping("/student-level/{studentlevel}")
    public List<User> getAllUserByStudentLevel(@PathVariable StudentLevel studentlevel){
        return iuserService.getAllUserByStudentLevel(studentlevel);
    }
    @GetMapping("/speciality/{speciality}")
    public List<User> getAllUserBySpeciality(@PathVariable Speciality speciality){
        return iuserService.getAllUserBySpeciality(speciality);
    }

    @PutMapping("/set-image/")
    @ResponseStatus(HttpStatus.OK)
    private void setUserImage(@RequestParam("id_user") int id_user,@RequestParam("userImage") MultipartFile image) throws IOException {
        iuserService.setUserImage(id_user,image);
    }
    @GetMapping()
    public List<User> getAllUser(){
        return iuserService.getAllUser();
    }





}
