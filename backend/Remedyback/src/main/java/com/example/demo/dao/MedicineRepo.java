package com.example.demo.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Medicine;

public interface MedicineRepo extends JpaRepository<Medicine,String> {
    public Optional<Medicine> findById(Long id);
}
