package com.example.demo.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dao.CartRepo;
import com.example.demo.dao.DoctorRepo;
import com.example.demo.dao.MedicineRepo;
import com.example.demo.dao.OrderRepo;
import com.example.demo.dao.UserRepo;
import com.example.demo.help.ErrorResponse;
import com.example.demo.model.AuthRequest;
import com.example.demo.model.Cart;
import com.example.demo.model.Doctor;
import com.example.demo.model.Medicine;
import com.example.demo.model.Orders;
import com.example.demo.model.Users;
import com.example.demo.service.FileUpload;
import com.example.demo.util.JwtUtil;


@RestController
public class MainController{
	private static final String USERS_ID = "/users/{id}";
@Autowired
CartRepo cartRepo;
	
	@Autowired
	DoctorRepo doctorRepo;
	
	@Autowired
	UserRepo repo;
	@Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;
	PasswordEncoder p=new BCryptPasswordEncoder();
	
	
	@PostMapping(path="/adduser",produces= {"application/json"},consumes= {"application/json"})
	@ResponseBody
	public ResponseEntity<ErrorResponse>  addUser(@RequestBody Users user)
	{
		
		System.out.println(user.getFirstName());
		 
		String password=p.encode(user.getPassword());
		user.setPassword(password);
		
		System.out.println(user.getFirstName());
		List list1=repo.findByPhone(user.getPhone());
		List list2=repo.findByEmail(user.getEmail());
		Users list3=repo.findByUserName(user.getUserName());
		
		if(list1.isEmpty()&&list2.isEmpty()&&list3==null)
		{
	
			repo.save(user);
			return ResponseEntity.of(Optional.of(new ErrorResponse("Successfully Registered","200")));
		}
		else if(!list1.isEmpty())
		{
			return ResponseEntity.status(400).body(new ErrorResponse("Phone Number Already in use","400"));
		}
		else if(!list2.isEmpty())
			return ResponseEntity.status(400).body(new ErrorResponse("Email Already in use","400"));
		else
			return ResponseEntity.status(400).body(new ErrorResponse("Username Already in use","400"));
	}
	@PostMapping(path="/adddoctor",produces= {"application/json"},consumes= {"application/json"})
	@ResponseBody
	public ResponseEntity<ErrorResponse>  addDoctor(@RequestBody Doctor doc)
	{
		
		System.out.println(doc.getName());
		 
		String password=p.encode(doc.getPassword());
		doc.setPassword(password);
		
		System.out.println(doc.getName());
		List list1=doctorRepo.findByPhone(doc.getPhone());
		List list2=doctorRepo.findByEmail(doc.getEmail());
		Doctor list3=doctorRepo.findByUserName(doc.getUserName());
		
		if(list1.isEmpty()&&list2.isEmpty()&&list3==null)
		{
	
			doctorRepo.save(doc);
			return ResponseEntity.of(Optional.of(new ErrorResponse("Successfully Registered","200")));
		}
		else if(!list1.isEmpty())
		{
			return ResponseEntity.status(400).body(new ErrorResponse("Phone Number Already in use","400"));
		}
		else if(!list2.isEmpty())
			return ResponseEntity.status(400).body(new ErrorResponse("Email Already in use","400"));
		else
			return ResponseEntity.status(400).body(new ErrorResponse("Username Already in use","400"));
	}
	

	@PostMapping(path="/login",produces= {"application/json"},consumes= {"application/json"})
	@ResponseBody
	public ResponseEntity<ErrorResponse> login(@RequestBody AuthRequest authRequest){
		System.out.println(authRequest.getUserName());
		Users auth=repo.findByUserName(authRequest.getUserName());
		boolean match=false;
		if(auth!=null)
		 match=p.matches(authRequest.getPassword(), auth.getPassword());
		else 
		{
			Doctor auth1=doctorRepo.findByUserName(authRequest.getUserName());

			if(auth1.getStatus().toString().equals("false"))
			return ResponseEntity.status(200).body(new ErrorResponse("Your Status is false","200"));
			match=p.matches(authRequest.getPassword(), auth1.getPassword());
		}
		if(match){
		try {
			
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword())
            );
        } catch (Exception ex) {
			System.out.println(ex.getMessage());
            try {
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        }
        return ResponseEntity.status(200).body(new ErrorResponse(jwtUtil.generateToken(authRequest.getUserName()),"200"));
	}
	else
	{
		return ResponseEntity.status(400).body(new ErrorResponse("Invalid username/password","400"));
	}
	}
	
	}

    
}
