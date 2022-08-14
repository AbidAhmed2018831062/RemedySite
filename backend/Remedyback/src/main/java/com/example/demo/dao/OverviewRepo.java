package com.example.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Overview;

public interface OverviewRepo extends JpaRepository<Overview,String> {
    public Overview findByUsername(String username);
}
