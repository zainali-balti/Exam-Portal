package com.exam.service;

import com.exam.model.exam.Category;
import org.springframework.stereotype.Service;

import java.util.Set;


public interface CategoryService {

    Category addCategory(Category category);
    Category updateCategory(Category category);
    Set<Category> getAllCategory();
    Category getCategoryById(Long cId);
    void deleteCategory(Long cId);
}
