package com.exam.controller;

import com.exam.dto.QuizUpdateRequest;
import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;
import com.exam.service.QuizService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("http://localhost:4200/")
public class QuizController {
    @Autowired
    private QuizService quizService;

    @PostMapping("/")
    public ResponseEntity<Quiz> addQuiz(@RequestBody Quiz quiz){
        return ResponseEntity.ok(this.quizService.addQuiz(quiz));
    }
    @PutMapping("/")
    public ResponseEntity<Quiz> updateQuiz(@RequestBody Quiz quiz){
        return ResponseEntity.ok(this.quizService.updateQuiz(quiz));
    }
    @GetMapping("/")
    public ResponseEntity<?> getAllQuiz(){
        return ResponseEntity.ok(this.quizService.getAllQuiz());
    }
    @GetMapping("/{quizId}")
    public Quiz getQuizById(@PathVariable Long quizId){
        return this.quizService.getQuizById(quizId);
    }
    @DeleteMapping("/{quizId}")
    public void deleteQuiz(@PathVariable Long quizId){
        this.quizService.deleteQuiz(quizId);
    }

    @GetMapping("/category/{cid}")
    public List<Quiz> getQuizByCategory(@PathVariable Long cid){
        Category category = new Category();
        category.setCId(cid);
        return this.quizService.getQuizByCategory(category);
    }
    @GetMapping("/active")
    public List<Quiz> getQuizByActive(){
        return this.quizService.getQuizByActive();
    }
    @GetMapping("/category/active/{cid}")
    public List<Quiz> getQuizByCategoryAndActive(@PathVariable Long cid){
        Category category = new Category();
        category.setCId(cid);
        return this.quizService.geQuizByCategoryAndActivation(category);
    }
}
