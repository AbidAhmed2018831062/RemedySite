package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Blog;

public interface BlogRepo extends JpaRepository<Blog,Long> {
    List<Blog> findByUsername(String username);
   
}
