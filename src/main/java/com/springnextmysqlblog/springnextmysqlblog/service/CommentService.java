package com.springnextmysqlblog.springnextmysqlblog.service;

import com.springnextmysqlblog.springnextmysqlblog.model.Comment;
import com.springnextmysqlblog.springnextmysqlblog.model.Post;
import com.springnextmysqlblog.springnextmysqlblog.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    //add

    public Comment addComment(Comment comment){
        return commentRepository.save(comment);
    }

    public Comment getComment(Long commentId){
        return commentRepository.findById(commentId).get();
    }

    public List<Comment> getComments(){
        return commentRepository.findAll();
    }
    

}
