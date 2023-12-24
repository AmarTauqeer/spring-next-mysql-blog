package com.springnextmysqlblog.springnextmysqlblog.service;

import com.springnextmysqlblog.springnextmysqlblog.model.Author;

import com.springnextmysqlblog.springnextmysqlblog.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorService {

    @Autowired
    private AuthorRepository authorRepository;

    public Author addAuthor(Author author) {
        return authorRepository.save(author);
    }


    public List<Author> findAuthors() {
        return authorRepository.findAll();
    }

    public Author findAuthor(Long authorId) {
        return authorRepository.findById(authorId).get();
    }

    public Author updateAuthor(Author author) {

        Author existingAuthor = authorRepository.findById(author.getAuthorId()).get();
        existingAuthor.setAuthorName(author.getAuthorName());
        existingAuthor.setAuthorImage(author.getAuthorImage());
        return authorRepository.save(existingAuthor);
    }

    public String deleteAuthor(Long authorId) {
        authorRepository.deleteById(authorId);
        return "Record has been deleted successfully.";
    }
}
