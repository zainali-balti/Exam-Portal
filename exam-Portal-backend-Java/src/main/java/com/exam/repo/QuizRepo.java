package com.exam.repo;

import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepo extends JpaRepository<Quiz,Long> {
    List<Quiz> findBycategory(Category category);
    List<Quiz> findByIsActive(boolean isActive);

    List<Quiz> findByCategoryAndIsActive(Category category, boolean isActive);
}
