package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Orders;

public interface OrderRepo extends JpaRepository<Orders,String>{
    
    List<Orders> findByUsername(String username);
}
