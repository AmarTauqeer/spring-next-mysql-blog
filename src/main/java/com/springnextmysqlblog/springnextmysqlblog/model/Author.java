package com.springnextmysqlblog.springnextmysqlblog.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "author")
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long authorId;
    private String authorName;
    @CreationTimestamp
    private Date createdAt;
    private String authorImage;


//    @JsonIgnore
//    @OneToMany(mappedBy = "author")
//    private List<Post> posts = new ArrayList<>();
//
//    @Override
//    public String toString() {
//        return "Author{" +
//                "authorId=" + authorId +
//                ", authorName='" + authorName + '\'' +
//                ", createdAt=" + createdAt +
//                ", authorImage='" + authorImage + '\'' +
//                '}';
//    }
}