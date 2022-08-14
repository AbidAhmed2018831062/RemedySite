package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Review;

public interface ReviewRepo extends JpaRepository<Review, Integer>{
    List<Review> findByUsername(String username);
    List<Review> findBydoctorusername(String username);

}
