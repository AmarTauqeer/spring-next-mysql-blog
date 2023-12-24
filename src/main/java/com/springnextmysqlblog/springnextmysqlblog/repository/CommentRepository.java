package com.springnextmysqlblog.springnextmysqlblog.repository;

import com.springnextmysqlblog.springnextmysqlblog.model.Comment;
import com.springnextmysqlblog.springnextmysqlblog.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

}
