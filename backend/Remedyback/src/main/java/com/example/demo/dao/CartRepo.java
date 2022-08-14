package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Cart;

public interface CartRepo extends JpaRepository<Cart,Long>{
  public List<Cart> findByUsername(String username);
    public void deleteById(Long id);
    public Cart findBymedicineId(Long id);    
      public Integer deleteByUsername(String username);
   
}
