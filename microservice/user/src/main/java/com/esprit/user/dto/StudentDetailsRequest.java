package com.esprit.user.dto;

import com.esprit.user.enums.ClassLevel;
import com.esprit.user.enums.Speciality;
import com.esprit.user.enums.StudentLevel;
import java.time.LocalDate;

public class StudentDetailsRequest {
    private StudentLevel level;
    private ClassLevel classe;
    private byte[] userImage;
    private byte[] studentCV;
    private LocalDate birthdate;
    private Speciality specialty;

    // Constructor without args
    public StudentDetailsRequest() {
    }

    // Constructor with all fields
    public StudentDetailsRequest(StudentLevel level, ClassLevel classe, byte[] userImage, byte[] studentCV, LocalDate birthdate, Speciality specialty) {
        this.level = level;
        this.classe = classe;
        this.userImage = userImage;
        this.studentCV = studentCV;
        this.birthdate = birthdate;
        this.specialty = specialty;
    }

    // Getters and Setters
    public StudentLevel getLevel() {
        return level;
    }

    public void setLevel(StudentLevel level) {
        this.level = level;
    }

    public ClassLevel getClasse() {
        return classe;
    }

    public void setClasse(ClassLevel classe) {
        this.classe = classe;
    }

    public byte[] getUserImage() {
        return userImage;
    }

    public void setUserImage(byte[] userImage) {
        this.userImage = userImage;
    }

    public byte[] getStudentCV() {
        return studentCV;
    }

    public void setStudentCV(byte[] studentCV) {
        this.studentCV = studentCV;
    }

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    public Speciality getSpecialty() {
        return specialty;
    }

    public void setSpecialty(Speciality specialty) {
        this.specialty = specialty;
    }

}
