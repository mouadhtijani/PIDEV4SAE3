package com.esprit.iqtest.repo;

import com.esprit.iqtest.entity.IqQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IqQuestionRepository extends JpaRepository<IqQuestion, Long> {
}
