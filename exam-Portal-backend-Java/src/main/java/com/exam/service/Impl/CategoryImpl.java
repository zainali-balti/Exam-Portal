package com.exam.service.Impl;

import com.exam.model.exam.Category;
import com.exam.repo.CategoryRepo;
import com.exam.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.Set;

@Service
public class CategoryImpl implements CategoryService {
    @Autowired
    private CategoryRepo categoryRepo;
    @Override
    public Category addCategory(Category category) {
        return this.categoryRepo.save(category);
    }

    @Override
    public Category updateCategory(Category category) {
        return this.categoryRepo.save(category);
    }

    @Override
    public Set<Category> getAllCategory() {
        return new LinkedHashSet<>(this.categoryRepo.findAll());
    }

    @Override
    public Category getCategoryById(Long cId) {
        return this.categoryRepo.findById(cId).get();
    }

    @Override
    public void deleteCategory(Long cId) {
        Category category = new Category();
        category.setCId(cId);
        this.categoryRepo.delete(category);
    }
}
