package com.exam.controller;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("question")
@CrossOrigin("http://localhost:4200/")
public class QuestionController {
    @Autowired
    private QuestionService questionService;
    @Autowired
    private QuizService quizService;

    @PostMapping("/")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }
    @GetMapping("/")
    public ResponseEntity<?> getAllQuestion(){
        return  ResponseEntity.ok(this.questionService.getAllQuestion());
    }
    @PutMapping("/")
    public ResponseEntity<Question> updateQuestion(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }
    @DeleteMapping("/{questionId}")
    public void deleteQuestion(@PathVariable Long questionId){
        this.questionService.deleteQuestion(questionId);
    }
    @GetMapping("/{questionId}")
    public Question getById(@PathVariable Long questionId){
        return this.questionService.getQuestionById(questionId);
    }
    @GetMapping("/quiz/{qId}")
    public ResponseEntity<?> getQuestionOfQuiz(@PathVariable Long qId){
        Quiz quiz = this.quizService.getQuizById(qId);
        if (quiz == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Quiz not found for ID: " + qId);
        }
        Set<Question> questionSet = this.questionService.getQuestionOfQuiz(quiz);
        List<Question> list = new ArrayList<>(questionSet);
        if (list.size()>quiz.getNumberOfQuestions()){
            list = list.subList(0,quiz.getNumberOfQuestions());
        }
        list.forEach(q->{
            q.setAnswer("");
        });
        Collections.shuffle(list);
        return ResponseEntity.ok(list);
    }
}
