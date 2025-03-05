package com.example.projectWork.Repository;

import com.example.projectWork.models.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.example.projectWork.enums.Role;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {

    @Query("SELECT h FROM History h WHERE h.user.userId = :userId")
    Page<History> findByUserId(@Param("userId") Integer userId, Pageable pageable);

    @Query("SELECT h FROM History h JOIN h.user u WHERE u.role = :role")
    Page<History> findByUserRole(@Param("role") Role role, Pageable pageable);
}