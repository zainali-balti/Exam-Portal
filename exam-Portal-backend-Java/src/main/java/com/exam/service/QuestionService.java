package com.exam.service;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.repo.QuestionRepo;
import org.springframework.stereotype.Service;

import java.util.Set;


public interface QuestionService {
    Question addQuestion(Question question);
    Question updateQuestion(Question question);
    Set<Question> getAllQuestion();
    Question getQuestionById(Long quesId);
    Set<Question> getQuestionOfQuiz(Quiz quiz);
    void deleteQuestion(Long quesId);
}
