package com.exam.service;

import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;

import java.util.List;
import java.util.Set;


public interface QuizService {
     Quiz addQuiz(Quiz quiz);
     Quiz updateQuiz(Quiz quiz);
     List<Quiz> getAllQuiz();
     Quiz getQuizById(Long qId);
     void deleteQuiz(Long qId);

    List<Quiz> getQuizByCategory(Category category);
    List<Quiz> getQuizByActive();
    List<Quiz> geQuizByCategoryAndActivation(Category category);
}
