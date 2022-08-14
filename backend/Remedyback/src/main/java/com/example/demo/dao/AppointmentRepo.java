package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Appointment;

public interface AppointmentRepo extends JpaRepository<Appointment,Integer>{
    List<Appointment> findByDoctorusernameAndDate(String username,String date);
    List<Appointment> findByUsername(String username);
}
