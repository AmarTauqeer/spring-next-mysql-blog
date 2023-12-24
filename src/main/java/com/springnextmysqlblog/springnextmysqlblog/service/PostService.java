package com.springnextmysqlblog.springnextmysqlblog.service;


import com.springnextmysqlblog.springnextmysqlblog.model.Author;
import com.springnextmysqlblog.springnextmysqlblog.model.Category;
import com.springnextmysqlblog.springnextmysqlblog.model.Post;
import com.springnextmysqlblog.springnextmysqlblog.repository.PostRepository;
//import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Stream;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private AuthorService authorService;

    public Post addPost(Post post) {
        return postRepository.save(post);
    }


    public List<Post> findPosts() {
        return postRepository.findAll();
    }

    public Post findPost(Long postId) {
        return postRepository.findById(postId).get();
    }

    public Post updatePost(Post post) {

        Post existingPost = postRepository.findById(post.getPostId()).get();
        existingPost.setPostName(post.getPostName());
        existingPost.setPostContent(post.getPostContent());
        existingPost.setPostImage(post.getPostImage());
        existingPost.setCategory(post.getCategory());
        existingPost.setUser(post.getUser());

        System.out.println(existingPost);

        return postRepository.save(existingPost);
    }

    public void deletePost(Long postId) {
        postRepository.deleteById(postId);

    }

//    @Transactional
//    public List<Post> findAllPosts(){
//        System.out.println(postRepository.findAllPosts());
//        return postRepository.findAllPosts();
//    }


}
