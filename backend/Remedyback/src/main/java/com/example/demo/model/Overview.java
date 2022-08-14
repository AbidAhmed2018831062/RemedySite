package com.example.demo.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Overview {
    @Id
   private String username;
   private int appointmentcount;
   private int blogcount;
public String getUsername() {
    return username;
}
public void setUsername(String username) {
    this.username = username;
}
public int getAppointmentcount() {
    return appointmentcount;
}
public void setAppointmentcount(int appointmentcount) {
    this.appointmentcount = appointmentcount;
}
public int getBlogcount() {
    return blogcount;
}
public void setBlogcount(int blogcount) {
    this.blogcount = blogcount;
} 
}
