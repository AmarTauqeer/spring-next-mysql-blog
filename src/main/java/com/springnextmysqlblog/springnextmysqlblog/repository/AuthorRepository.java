package com.springnextmysqlblog.springnextmysqlblog.repository;

import com.springnextmysqlblog.springnextmysqlblog.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
}
