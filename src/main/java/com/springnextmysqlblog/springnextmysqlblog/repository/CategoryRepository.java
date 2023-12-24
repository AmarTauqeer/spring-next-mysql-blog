package com.springnextmysqlblog.springnextmysqlblog.repository;

import com.springnextmysqlblog.springnextmysqlblog.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
