package com.exam.controller;

import com.exam.model.exam.Category;
import com.exam.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/category")
@CrossOrigin("http://localhost:4200/")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @PostMapping("/")
    public ResponseEntity<Category> addCategory(@RequestBody Category category){
        return ResponseEntity.ok(this.categoryService.addCategory(category));
    }
    @GetMapping("/")
    public ResponseEntity<?> getAllCategory(){
        return ResponseEntity.ok(this.categoryService.getAllCategory());
    }
    @GetMapping("/{categoryId}")
    public Category getCategoryById(@PathVariable Long categoryId){
        return this.categoryService.getCategoryById(categoryId);
    }
    @PutMapping("/")
    public ResponseEntity<Category> updateCategory(@RequestBody Category category){
        return ResponseEntity.ok(this.categoryService.updateCategory(category));
    }
    @DeleteMapping("/{categoryId}")
    public void deleteCategory(@PathVariable Long categoryId){
        this.categoryService.deleteCategory(categoryId);
    }
}
