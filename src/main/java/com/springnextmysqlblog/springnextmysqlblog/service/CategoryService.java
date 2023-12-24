package com.springnextmysqlblog.springnextmysqlblog.service;

import com.springnextmysqlblog.springnextmysqlblog.model.Category;
import com.springnextmysqlblog.springnextmysqlblog.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;


    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }


    public List<Category> findCategories() {
        return categoryRepository.findAll();
    }

    public Category findCategory(Long categoryId) {
        return categoryRepository.findById(categoryId).get();
    }

    public Category updateCategory(Category category) {

        Category existingCategory = categoryRepository.findById(category.getCategoryId()).get();
        existingCategory.setCategoryName(category.getCategoryName());
        return categoryRepository.save(existingCategory);
    }

    public String deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
        return "Record has been deleted successfully.";
    }
}
