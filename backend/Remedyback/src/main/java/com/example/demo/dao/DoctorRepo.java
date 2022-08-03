package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Doctor;

public interface DoctorRepo extends JpaRepository<Doctor,Integer> {
  public   List<Doctor> findByPhone(String phone);
  public Doctor findByUserName(String username);
  public   List<Doctor> findByEmail(String email);
  public   List<Doctor> findByStatus(String status);
  public Doctor findById(int id);

}
