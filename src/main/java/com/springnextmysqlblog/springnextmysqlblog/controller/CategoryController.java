package com.springnextmysqlblog.springnextmysqlblog.controller;

import com.springnextmysqlblog.springnextmysqlblog.model.Category;
import com.springnextmysqlblog.springnextmysqlblog.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@CrossOrigin(origins = "*", methods = {RequestMethod.POST,
        RequestMethod.GET, RequestMethod.DELETE, RequestMethod.OPTIONS,
        RequestMethod.PATCH, RequestMethod.PUT})
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public Category addCategory(@RequestBody Category category){
        return categoryService.addCategory(category);
    }

    @GetMapping
//    @PreAuthorize("hasRole('Admin')")
    public List<Category> findCategories(){
        return categoryService.findCategories();
    }

    @GetMapping("/{categoryId}")
    public Category findCategory(@PathVariable("categoryId") Long categoryId){
        return categoryService.findCategory(categoryId);
    }

    @PutMapping("/update/{categoryId}")
    public Category updateCategory(@RequestBody Category category){
        return categoryService.updateCategory(category);
    }

    @DeleteMapping("/delete/{categoryId}")
    public String deleteCategory(@PathVariable("categoryId") Long categoryId){
        return categoryService.deleteCategory(categoryId);
    }
}
