package com.esprit.iqtest.repo;

import com.esprit.iqtest.entity.IqScore;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IqScoreRepository extends JpaRepository<IqScore, Long> {
    List<IqScore> findByUserId(Long userId);

}
