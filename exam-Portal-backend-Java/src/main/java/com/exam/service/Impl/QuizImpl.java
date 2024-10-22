package com.exam.service.Impl;


import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;
import com.exam.repo.CategoryRepo;
import com.exam.repo.QuizRepo;
import com.exam.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class QuizImpl implements QuizService {
    @Autowired
    private QuizRepo quizRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    @Override
    public Quiz addQuiz(Quiz quiz) {
        return this.quizRepo.save(quiz);
    }

    @Override
    public Quiz updateQuiz(Quiz quiz) {
        return this.quizRepo.save(quiz);
    }

    @Override
    public List<Quiz> getAllQuiz() {
        return this.quizRepo.findAll();
    }

    @Override
    public Quiz getQuizById(Long qId) {
        return this.quizRepo.findById(qId).get();
    }

    @Override
    public void deleteQuiz(Long qId) {
        Quiz quiz = new Quiz();
        quiz.setQId(qId);
        this.quizRepo.delete(quiz);
    }

    @Override
    public List<Quiz> getQuizByCategory(Category category) {
        return this.quizRepo.findBycategory(category);
    }

    @Override
    public List<Quiz> getQuizByActive() {
        return this.quizRepo.findByIsActive(true);
    }

    @Override
    public List<Quiz> geQuizByCategoryAndActivation(Category category) {
        return this.quizRepo.findByCategoryAndIsActive(category,true);
    }
}
