package com.springnextmysqlblog.springnextmysqlblog.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user")
public class User {
    @Id
    @Column(length = 50)
    private String userName;
    private String userFirstName;
    private String userLastName;
    private String userPassword;
    private String email;
    private String userImage;
    @CreationTimestamp
    private Date createdAt;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Post> posts = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Comment> comments = new ArrayList<>();


//    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "USER_ROLE",
            joinColumns = {
                    @JoinColumn(name = "USER_ID")
            }, inverseJoinColumns = {
            @JoinColumn(name = "ROLE_ID")
    }
    )
    private Set<Role> role;

    @Override
    public String toString() {
        return "User{" +
                "userName='" + userName + '\'' +
                ", userFirstName='" + userFirstName + '\'' +
                ", userLastName='" + userLastName + '\'' +
                ", userPassword='" + userPassword + '\'' +
                ", email='" + email + '\'' +
                ", userImage='" + userImage + '\'' +
                ", createdAt=" + createdAt +
                ", role=" + role +
                '}';
    }
}