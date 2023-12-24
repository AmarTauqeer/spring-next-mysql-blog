package com.springnextmysqlblog.springnextmysqlblog.controller;

import com.springnextmysqlblog.springnextmysqlblog.model.Comment;
import com.springnextmysqlblog.springnextmysqlblog.model.Post;
import com.springnextmysqlblog.springnextmysqlblog.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
@CrossOrigin
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/{commentId}")
    public Comment getComment(@PathVariable("commentId") Long commentId){
        return commentService.getComment(commentId);
    }

    @GetMapping
    public List<Comment> getComments(){
        return commentService.getComments();
    }

    @PostMapping
    public Comment addComment(@RequestBody Comment comment){

//        System.out.println(comment);
        return commentService.addComment(comment);
    }


}
