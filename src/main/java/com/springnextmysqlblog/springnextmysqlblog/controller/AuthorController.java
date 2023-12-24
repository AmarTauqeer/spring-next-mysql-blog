package com.springnextmysqlblog.springnextmysqlblog.controller;

import com.springnextmysqlblog.springnextmysqlblog.model.Author;
import com.springnextmysqlblog.springnextmysqlblog.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/author")
@CrossOrigin
public class AuthorController {

    @Autowired
    private AuthorService authorService;
    private final String FOLDER_PATH = "/home/amar/D/Java/JavaProject/spring-next-mysql-blog/src" +
            "/main/upload/static/images";


    @PostMapping
    public Author addAuthor(@ModelAttribute Author author,
                            @RequestParam(value = "file", required = false) MultipartFile file) {
        String fileName = file.getOriginalFilename();
        LocalDate localDate = LocalDate.now();
        fileName = localDate + "-" + fileName;

        Path fileNamePath = Paths.get(FOLDER_PATH, fileName);

        try {
            Files.write(fileNamePath, file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        author.setAuthorImage(fileName);

        return authorService.addAuthor(author);
    }

    @GetMapping
    public List<Author> findAuthors() {
        return authorService.findAuthors();
    }

    @GetMapping("/{authorId}")
    public Author findAuthor(@PathVariable("authorId") Long authorId) {
        return authorService.findAuthor(authorId);
    }

    @PutMapping("/update/{authorId}")
    public Author updateAuthor(@RequestBody Author author) {
        return authorService.updateAuthor(author);
    }

    @DeleteMapping("/delete/{authorId}")
    public String deleteAuthor(@PathVariable("authorId") Long authorId) {
        return authorService.deleteAuthor(authorId);
    }
}
