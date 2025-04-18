package com.example.projectWork.dto;

import com.example.projectWork.enums.ClassLevel;
import com.example.projectWork.enums.Speciality;
import com.example.projectWork.enums.StudentLevel;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StudentDetailsRequest {
    private StudentLevel level;
    private ClassLevel classe;
    private byte[] userImage;
    private byte[] studentCV;
    private LocalDate birthdate;
    private Speciality specialty;

}
