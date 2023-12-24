package com.springnextmysqlblog.springnextmysqlblog.repository;

import com.springnextmysqlblog.springnextmysqlblog.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,String> {
}
