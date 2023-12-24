package com.springnextmysqlblog.springnextmysqlblog.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Entity
@Table(name = "tags")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Tags {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagsId;
    private String tags;
}
