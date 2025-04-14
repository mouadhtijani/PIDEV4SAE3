package com.esprit.iqtest.service;

import com.esprit.iqtest.entity.IqQuestion;
import com.esprit.iqtest.entity.IqScore;
import com.esprit.iqtest.repo.IqQuestionRepository;
import com.esprit.iqtest.repo.IqScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class IqService {

    @Autowired
    private IqQuestionRepository questionRepo;

    @Autowired
    private IqScoreRepository scoreRepo;

    public List<IqQuestion> getAllQuestions() {
        List<IqQuestion> questions = questionRepo.findAll();
        Collections.shuffle(questions); // 🌀 Randomize the order
        return questions;
    }

    public void saveScore(Long userId, int score) {
        IqScore iqScore = new IqScore();
        iqScore.setUserId(userId);
        iqScore.setScore(score);
        scoreRepo.save(iqScore);
    }
    public List<IqScore> getScoresForUser(Long userId) {
        return scoreRepo.findByUserId(userId);
    }

}
