package com.example.demo.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.dao.AdminLoginRepo;
import com.example.demo.dao.DoctorRepo;
import com.example.demo.dao.UserRepo;
import com.example.demo.model.AdminLogin;
import com.example.demo.model.Doctor;
import com.example.demo.model.Users;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepo repository;
    @Autowired DoctorRepo doctorRepo;
@Autowired
AdminLoginRepo adminRepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Doctor doc;
        AdminLogin admin;
        Users user = repository.findByUserName(username);
        if(user==null){
        doc=doctorRepo.findByUserName(username);
        if(doc==null){
        admin=adminRepo.findByUsername(username);
        return new org.springframework.security.core.userdetails.User(admin.getUsername(), admin.getPassword(), new ArrayList<>());
        }
        else
        return new org.springframework.security.core.userdetails.User(doc.getUserName(), doc.getPassword(), new ArrayList<>());
        }
        else
        return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(), new ArrayList<>());
    }
}