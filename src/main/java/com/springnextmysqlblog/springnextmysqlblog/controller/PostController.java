package com.springnextmysqlblog.springnextmysqlblog.controller;

import com.springnextmysqlblog.springnextmysqlblog.model.*;
import com.springnextmysqlblog.springnextmysqlblog.repository.AuthorRepository;
import com.springnextmysqlblog.springnextmysqlblog.repository.CategoryRepository;
import com.springnextmysqlblog.springnextmysqlblog.repository.PostRepository;
import com.springnextmysqlblog.springnextmysqlblog.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@RestController
@RequestMapping("/post")
@CrossOrigin
public class PostController {
    @Autowired
    private PostService postService;


    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CommentService commentService;


    @Autowired
    private UserService userService;
    private final String FOLDER_PATH = "/home/amar/D/Java/JavaProject/spring-next-mysql-blog/src/main/upload/static/images";

    @PostMapping
    public Post addPost(@ModelAttribute Post post,
                        @RequestParam(value = "file", required = false) MultipartFile file) {
        System.out.println(post);

        if (file != null) {

            String fileName = file.getOriginalFilename();
            LocalDate localDate = LocalDate.now();
            fileName = localDate + "-" + fileName;

            Path fileNamePath = Paths.get(FOLDER_PATH, fileName);


            try {
                Files.write(fileNamePath, file.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            post.setPostImage(fileName);
        }
        // category data
        Category category = categoryService.findCategory(post.getCategory().getCategoryId());
        post.setCategory(category);

        return postService.addPost(post);
    }

    @GetMapping
    public List<Post> findPosts() {
        return postService.findPosts();
    }

    @GetMapping("/{postId}")
    public Post findPost(@PathVariable("postId") Long postId) {
        return postService.findPost(postId);
    }


    @PatchMapping("/update/{postId}")
    public Post updatePost(@ModelAttribute("post") Post post,
                           @RequestParam(value = "file", required = false) MultipartFile file) {

        System.out.println(post);


        if (file != null) {

            String fileName = file.getOriginalFilename();
            LocalDate localDate = LocalDate.now();
            fileName = localDate + "-" + fileName;

            Post existingPost = postService.findPost(post.getPostId());
            System.out.println("old image" +existingPost);
            String oldImage = existingPost.getPostImage();
            System.out.println("old image" +oldImage);

            // post image
            if (!file.isEmpty()) {

                try {
                    Path fileNamePath = Paths.get(FOLDER_PATH, fileName);
                    if ((oldImage == null) || (oldImage.isEmpty())) {
                        System.out.println("1");
                        Files.write(fileNamePath, file.getBytes());
                    } else {
                        System.out.println("2");
                        Path oldImagePath = Paths.get(FOLDER_PATH, oldImage);
                        System.out.println("old image path " + oldImagePath);
                        Files.write(fileNamePath, file.getBytes());
                        Files.delete(oldImagePath);

                    }
                    System.out.println("4 " + post + " " + fileName);
                    post.setPostImage(fileName);
                    System.out.println("5 " + post);

                } catch (IOException e) {
                    throw new RuntimeException(e);
                }

            } else {
                System.out.println("3");
                post.setPostImage(oldImage);
            }
        }
        System.out.println("category id = "+post.getCategory().getCategoryId());
        Category category = categoryService.findCategory(post.getCategory().getCategoryId());
        User user = userService.getUserById(post.getUser().getUserName());
        System.out.println("category = "+category);
        System.out.println("author = "+user);
        post.setCategory(category);
        post.setUser(user);
        System.out.println("6 " +post);

        return postService.updatePost(post);
    }

    @DeleteMapping("/delete/{postId}")
    public void deletePost(@PathVariable("postId") Long postId) throws IOException {

        Post existingPost = postService.findPost(postId);
        String postImage = existingPost.getPostImage();

        if (!postImage.isEmpty()) {

            Path imagePath = Paths.get(FOLDER_PATH, postImage);
            System.out.println("image path " + imagePath);
            Files.delete(imagePath);
        }
        postService.deletePost(postId);
    }

    @PutMapping("/assign-category-user")
    public String assignCategoryUser(
            @RequestParam("categoryId") Long categoryId,
            @RequestParam("userId") String authorId,
            @RequestParam("postId") Long postId) {
        Post post = postService.findPost(postId);
        Category category = categoryService.findCategory(categoryId);
        User user = userService.getUserById(authorId);

        post.setCategory(category);
        post.setUser(user);
        postService.addPost(post);

        return "Category and User successfully assigned to post.";
    }

    @PatchMapping("/assign-post-comment/{postId}/{commentId}/{userName}")
    public Comment assignCommentToPost(@PathVariable("postId") Long postId,
                                    @PathVariable("commentId") Long commentId,
                                       @PathVariable("userName") String userName){

        Post post =postService.findPost(postId);
        Comment comment =commentService.getComment(commentId);
        User user = userService.getUserById(userName);
        comment.setPost(post);
        comment.setUser(user);

        return commentService.addComment(comment);
    }



}
