package com.springnextmysqlblog.springnextmysqlblog.repository;

import com.springnextmysqlblog.springnextmysqlblog.model.Author;
import com.springnextmysqlblog.springnextmysqlblog.model.Category;
import com.springnextmysqlblog.springnextmysqlblog.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

//    @Procedure(value = "all_posts_with_category_author")
//    public List<Post> findAllPosts();
}
