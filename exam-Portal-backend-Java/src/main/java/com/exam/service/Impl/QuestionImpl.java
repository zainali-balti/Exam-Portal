package com.exam.service.Impl;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.repo.QuestionRepo;
import com.exam.repo.QuizRepo;
import com.exam.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class QuestionImpl implements QuestionService {
    @Autowired
    private QuestionRepo questionRepo;
    @Autowired
    private QuizRepo quizRepo;
    @Override
    public Question addQuestion(Question question) {
        Quiz quiz = quizRepo.findById(question.getQuiz().getQId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
        question.setQuiz(quiz);
        return this.questionRepo.save(question);
    }

    @Override
    public Question updateQuestion(Question question) {
        return this.questionRepo.save(question);
    }

    @Override
    public Set<Question> getAllQuestion() {
        return new HashSet<>(this.questionRepo.findAll());
    }

    @Override
    public Question getQuestionById(Long quesId) {
        return this.questionRepo.findById(quesId).get();
    }

    @Override
    public Set<Question> getQuestionOfQuiz(Quiz quiz) {
        return this.questionRepo.findByQuiz(quiz);
    }

    @Override
    public void deleteQuestion(Long quesId) {
      Question question = new Question();
      question.setQuesId(quesId);
      this.questionRepo.delete(question);
    }
}
