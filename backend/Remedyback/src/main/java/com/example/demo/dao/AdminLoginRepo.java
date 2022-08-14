package com.example.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.AdminLogin;

public interface AdminLoginRepo extends JpaRepository<AdminLogin,Integer>{
    AdminLogin findByUsername(String username);
}
