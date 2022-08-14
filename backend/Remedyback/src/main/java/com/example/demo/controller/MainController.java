package com.example.demo.controller;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
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

import com.example.demo.dao.AdminLoginRepo;
import com.example.demo.dao.AppointmentRepo;
import com.example.demo.dao.BlogRepo;
import com.example.demo.dao.CartRepo;
import com.example.demo.dao.DoctorRepo;
import com.example.demo.dao.MedicineRepo;
import com.example.demo.dao.OrderRepo;
import com.example.demo.dao.OverviewRepo;
import com.example.demo.dao.ReviewRepo;
import com.example.demo.dao.UserRepo;
import com.example.demo.help.ErrorResponse;
import com.example.demo.model.AdminLogin;
import com.example.demo.model.Appointment;
import com.example.demo.model.AuthRequest;
import com.example.demo.model.Blog;
import com.example.demo.model.Cart;
import com.example.demo.model.Doctor;
import com.example.demo.model.Medicine;
import com.example.demo.model.Orders;
import com.example.demo.model.Overview;
import com.example.demo.model.Review;
import com.example.demo.model.Users;
import com.example.demo.service.FileUpload;
import com.example.demo.util.JwtUtil;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;




@RestController
public class MainController{
	@Value("${api_key}")
String api;
	private static final String USERS_ID = "/users/{id}";
@Autowired
CartRepo cartRepo;
@Autowired

AppointmentRepo appRepo;
@Autowired
AdminLoginRepo adminRepo;
@Autowired 
OverviewRepo ovRepo;
	@Autowired
	OrderRepo orderRepo;
	@Autowired
	ReviewRepo revRepo;
	@Autowired
	DoctorRepo doctorRepo;
	@Autowired
	FileUpload fileup;
	@Autowired
	BlogRepo blogRepo;
	@Autowired
	MedicineRepo mediRepo;
	@Autowired
	UserRepo repo;
	@Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;
	PasswordEncoder p=new BCryptPasswordEncoder();
	@GetMapping(value="/doctor/todayappointment/{username}")
	public ResponseEntity<?> getAppointments(@PathVariable("username") String username)
	{
	Date date=new Date();
	String s=String.valueOf(date.getYear());
	System.out.println(username+" "+ date.getMonth()+" "+date.getDay()+" "+20+s.charAt(1)+""+s.charAt(2));
       List<Appointment> list=appRepo.findByDoctorusernameAndDate( username, date.getMonth()+" "+date.getDate()+" "+20+s.charAt(1)+""+s.charAt(2));
	
		if(list!=null)
		return ResponseEntity.status(200).body(list);
		else
		return ResponseEntity.of(Optional.of(new ErrorResponse("No appointment found","400")));

	}
	@GetMapping(value="/doctor/doctorgetprofile/{id}")
	public ResponseEntity<?> getAppointments(@PathVariable("id") int  id)
	{
	Doctor list=doctorRepo.findById(id);
		if(list!=null)
		return ResponseEntity.status(200).body(list);
		else
		return ResponseEntity.of(Optional.of(new ErrorResponse("No appointment found","400")));

	}
	
	@CrossOrigin(origins= {"*"}, maxAge = 4800, allowCredentials = "false" )
	@PostMapping(path="/payment")
	public ResponseEntity<?> payment(Orders order,HttpServletResponse response) throws IOException
	{
		
		SessionCreateParams params =
				SessionCreateParams.builder()
				  .setMode(SessionCreateParams.Mode.PAYMENT)
				  .setSuccessUrl("http://localhost:3000")
				  .setCancelUrl("http://localhost:3000").setCustomer(order.getUsername())
				  .addLineItem(
				  SessionCreateParams.LineItem.builder()
					.setQuantity(1L)
					.setPriceData(
					  SessionCreateParams.LineItem.PriceData.builder()
						.setCurrency("usd")
						.setUnitAmount(2000L)
						.setProductData(
						  SessionCreateParams.LineItem.PriceData.ProductData.builder()
							.setName("T-shirt")
							.build())
						.build())
					.build())
				  .build();
		
			  Session session;
			  
			try {
				session = Session.create(params);
				System.out.println("Hell");
				  return ResponseEntity.status(303).location(URI.create(session.getUrl())).build();

			} catch (StripeException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return  ResponseEntity.of(Optional.of(new ErrorResponse("No appointment found","400")));
			}
	
	}
	
	@PostMapping(path="/doctor/appointment",produces= {"application/json"},consumes= {"application/json"})
	@ResponseBody
	public ResponseEntity<?> bookappointment(@RequestBody Appointment app)
	{
		Appointment list=appRepo.save(app);
		if(list!=null)
		return ResponseEntity.status(200).body(new ErrorResponse("Appointment Successfull","200"));
		else
		return ResponseEntity.status(500).body(new ErrorResponse("Appointment Unsuccessfull","500"));

	}
	@GetMapping(value="/doctor/appointment")
	public ResponseEntity<?> bookAppointment()
	{
		List<Doctor> list=new ArrayList<>();
       list=doctorRepo.findAll();
		if(list!=null)
		return ResponseEntity.status(200).body(list);
		else
		return ResponseEntity.of(Optional.of(new ErrorResponse("No doctor found","400")));

	}
	@GetMapping(value="/users/getorders/{username}")
	public ResponseEntity<?> getuserorders(@PathVariable("username") String username)
	{
		List<Orders> list=new ArrayList<>();
       list=orderRepo.findByUsername(username);
		if(list!=null)
		return ResponseEntity.status(200).body(list);
		else
		return ResponseEntity.of(Optional.of(new ErrorResponse("No order found","400")));

	}
	@GetMapping(value="/users/getappointments/{username}")
	public ResponseEntity<?> getUserAppointments(@PathVariable("username") String username)
	{
		List<Appointment> list=new ArrayList<>();
       list=appRepo.findByUsername(username);
		if(list!=null)
		return ResponseEntity.status(200).body(list);
		else
		return ResponseEntity.of(Optional.of(new ErrorResponse("No appointment found","400")));

	}
	
	@GetMapping(value="/doctor/getdoctors")
	public ResponseEntity<?> getDoctors()
	{
		List<Doctor> list=new ArrayList<>();
       list=doctorRepo.findAll();
		if(list!=null)
		return ResponseEntity.status(200).body(list);
		else
		return ResponseEntity.of(Optional.of(new ErrorResponse("No doctor found","400")));

	}
	
	@GetMapping(value="/doctor/getreviews/{username}")
	public ResponseEntity<?> getReviews(@PathVariable("username") String username)
	{
		List<Review> list=new ArrayList<>();
       list=revRepo.findBydoctorusername(username);
		if(list!=null)
		return ResponseEntity.status(200).body(list);
		else
		return ResponseEntity.of(Optional.of(new ErrorResponse("No review found","400")));

	}
	
	@GetMapping(value="/medicine/{id}")
	public ResponseEntity<?> getMedicine(@PathVariable("id") Long id)
	{
	
        Optional<Medicine> med=mediRepo.findById(id);
		if(med!=null)
		return ResponseEntity.status(200).body(med);
		else
		return ResponseEntity.of(Optional.of(new ErrorResponse("No id found","400")));

	}
	@PostMapping(path="/doctor/addreview")
	@ResponseBody
	public ResponseEntity<?> addToCart(@RequestBody Review review)
	{
		try{
			revRepo.save(review);
			return  ResponseEntity.status(200).body(new ErrorResponse("Item added to cart successfully","200"));
		}
			catch(Exception e1){
			return  ResponseEntity.status(500).body(new ErrorResponse(e1.getMessage()+"Abid","500"));
			}
		}
		@PostMapping(path="/users/addtocart/{username}")
		@ResponseBody
		public ResponseEntity<?> addToCart(@RequestBody Cart cart)
		{
			try{
				cartRepo.save(cart);
				return  ResponseEntity.status(200).body(new ErrorResponse("Item added to cart successfully","200"));
			}
				catch(Exception e1){
				return  ResponseEntity.status(500).body(new ErrorResponse(e1.getMessage()+"Abid","500"));
				}
			}
		
		
	@PutMapping(path="/users/addtocart/{username}")
	@ResponseBody
	public ResponseEntity<?> addToCart1(@RequestBody Cart cart)
	{
		try{
			
				
				cartRepo.saveAndFlush(cart);
				return  ResponseEntity.status(200).body(new ErrorResponse("Added to cart","200"));
			}
			
		catch(Exception e){
			return  ResponseEntity.status(500).body(new ErrorResponse("Server Error","500"));
		}
	}
	@DeleteMapping("users/cart/deletemed/{id}")
	public ResponseEntity<?> getAllMedicine1(@PathVariable("id") Long id)
	{
		System.out.println("Abid");
		Cart ca=cartRepo.findBymedicineId(id);
		System.out.println("abid"+ca.getCompany());
		cartRepo.deleteById(id);
		
		return ResponseEntity.status(200).body(new ErrorResponse("Successfully deleted", "200"));
	}
	@GetMapping(value="/getdoctor/{username}")
	public ResponseEntity<?> getdoctor(@PathVariable("username") String username)
	{
		
		Doctor doctor=doctorRepo.findByUserName(username);
		return ResponseEntity.status(200).body(doctor);
	}
	@GetMapping(value="/doctorprofileuser/{username}")
	public ResponseEntity<?> getDoctorPofile(@PathVariable("username") String username)
	{
		
		Doctor doctor=doctorRepo.findByUserName(username);
		return ResponseEntity.status(200).body(doctor);
	}
	@GetMapping(value="/doctorprofile/{id}")
	public ResponseEntity<?> getDoctorPofile(@PathVariable("id") int id)
	{
		
		Doctor doctor=doctorRepo.findById(id);
		return ResponseEntity.status(200).body(doctor);
	}
	@GetMapping(value="/users/cart/{username}")
	public ResponseEntity<?> getAllMedicine(@PathVariable("username") String username)
	{
		
		List<Cart> list=new ArrayList<>();
		list=cartRepo.findByUsername(username);
		System.out.println(list.get(0).getFileName());
		return ResponseEntity.status(200).body(list);
	}
    @GetMapping(value="/users/allmedicine")
	public ResponseEntity<?> getAllMedicine()
	{
		
		List<Medicine> list=new ArrayList<>();
		list=mediRepo.findAll();
		return ResponseEntity.status(200).body(list);
	}
	@GetMapping(value="doctor/getdoctor/{search}")
	public ResponseEntity<?> getDoctorResults(@PathVariable("search") String search)
	{
		System.out.println(search);
       List<Doctor> list=new ArrayList<>();
	   List<Doctor> list1=doctorRepo.findAll();
	   for(int i=0;i<list1.size();i++)
	   {
		if(list1.get(i).getName().contains(search)||list1.get(i).getCategory().contains(search)||list1.get(i).getAddress().contains(search))
		list.add(list1.get(i));
	   }
		if(list.size()>0)
		return ResponseEntity.ok(list);
		else
		return ResponseEntity.status(404).body(Optional.of(new ErrorResponse("No username found","400")));

	}
	
	@GetMapping(value="medicine/getResults/{search}")
	public ResponseEntity<?> getResults(@PathVariable("search") String search)
	{
       List<Medicine> list=new ArrayList<>();
	   List<Medicine> list1=mediRepo.findAll();
	   for(int i=0;i<list1.size();i++)
	   {
		if(list1.get(i).getCategory().contains(search)||list1.get(i).getName().contains(search)||list1.get(i).getDesc().contains(search))
		list.add(list1.get(i));
	   }
		if(list.size()>0)
		return ResponseEntity.ok(list);
		else
		return ResponseEntity.status(404).body(Optional.of(new ErrorResponse("No username found","400")));

	}
	@GetMapping(value="/doctor/showsinglepost/{id}")
	public ResponseEntity<?> getSinglePost(@PathVariable("id") Long id)
	{
     Optional<Blog> blog= blogRepo.findById(id);
	 System.out.println(blog.get().getUsername());
		if(blog!=null)
		return ResponseEntity.ok(blog.get());
		else
		return ResponseEntity.of(Optional.of(new ErrorResponse("No posts found","400")));

	}
    @GetMapping(value="/getProfileDetails/{id}")
	public ResponseEntity<?> getProfileDetails(@PathVariable("id") String username)
	{
        Users us=repo.findByUserName(username);
		if(us!=null)
		return ResponseEntity.ok(us);
		
			else
		return ResponseEntity.of(Optional.of(new ErrorResponse("No username found","400")));
		

	}
	@GetMapping(value="/doctor/getoverview/{username}")
	public ResponseEntity<?> getOverview(@PathVariable("username") String username)
	{
        Overview over=ovRepo.findByUsername(username);
		if(over!=null)
		return ResponseEntity.ok(over);
		else
		return ResponseEntity.of(Optional.of(new ErrorResponse("No username found","400")));

	}
	@PutMapping(value="/doctor/overviewup/{username}")
	public ResponseEntity<?> updateCount(@PathVariable("username") String  username,@RequestBody Overview ov1)
	{
      Overview ov=ovRepo.findByUsername(username);
	  if(ov1.getBlogcount()==1)
	  {
		ov.setBlogcount(ov.getBlogcount()+1);
	  }
	  else
	  ov.setAppointmentcount(ov.getAppointmentcount()+1);
	  ovRepo.save(ov);
	  return ResponseEntity.status(200).body(new ErrorResponse("Successfully Increased", "200"));
	}
	@GetMapping(value="/doctor/getallposts")
	public ResponseEntity<?> getAllPosts()
	{
     
	   List<Blog> list=blogRepo.findAll();
		if(list!=null)
		return ResponseEntity.ok(list);
		else
		return ResponseEntity.of(Optional.of(new ErrorResponse("No posts found","400")));

	}
	@GetMapping(value="/getorders/{username}")
	public ResponseEntity<?> getOrders(@PathVariable("username") String username)
	{
     
	   List<Orders> list=orderRepo.findByUsername(username);
	    List<Appointment> list1=appRepo.findByUsername(username);
		List<Integer> list2=new ArrayList<>();
      list2.add(list.size());
	  list2.add(list1.size());
		if(list!=null)
		return ResponseEntity.ok(list2);
		else
		return ResponseEntity.of(Optional.of(new ErrorResponse("No posts found","400")));

	}
	
	@GetMapping(value="/doctor/getposts/{id}")
	public ResponseEntity<?> getDoctorPosts(@PathVariable("id") int id)
	{
       Doctor doc=doctorRepo.findById(id);
	   List<Blog> list=blogRepo.findByUsername((doc.getUserName()));
		if(list!=null)
		return ResponseEntity.ok(list);
		else
		return ResponseEntity.of(Optional.of(new ErrorResponse("No posts found","400")));

	}
	@DeleteMapping(value="users/cart/delete/{username}")
	public ResponseEntity<?> deleteCart(@PathVariable("username") String username)
	{
		
		System.out.println(username);
		List<Cart> list=new ArrayList<>();
		 list=cartRepo.findByUsername(username);
		// System.out.println(list.get());
		for(int i=0;i<list.size();i++){
			System.out.println(list.get(i).getCompany());
		cartRepo.delete(list.get(i));
		}
		//cartRepo.deleteByUsername(username);
		return ResponseEntity.status(200).body(new ErrorResponse("Successfully deleted", "200"));
	}
	
    @DeleteMapping(value=USERS_ID)
	public ResponseEntity<?> deleteUser(@PathVariable("id") String userName)
	{
		Users us=repo.findByUserName(userName);
		if(us!=null)
		{
			return ResponseEntity.of(Optional.of(new ErrorResponse("Successfully deleted","200")));

		}
else 
		return ResponseEntity.status(400).body(new ErrorResponse("No username found","400"));
	}
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@PostMapping(path="/users/neworder",produces= {"application/json"},consumes= {"application/json"})
	@ResponseBody
	public ResponseEntity<?> newOrder(@RequestBody Orders order)
	{
		try{
			
		if(order.getAddress()!=null&&order.getPhone()!=null&&order.getName()!=null&&order.getEmail()!=null&&order.getUsername()!=null)
		{
			System.out.println("Hello");
			orderRepo.save(order);
			
			return ResponseEntity.ok(new ErrorResponse("Medicine ordered successfully", "200"));
		}
		else
		{
			return ResponseEntity.status(400).body(new ErrorResponse("Medicine cannot be ordered now", "400"));
		}
	}
	catch(Exception e)
	{
		return ResponseEntity.status(500).body(new ErrorResponse(e.getMessage(), "500"));
	}
	}
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
			Overview ov=new Overview();
			ov.setUsername(doc.getUserName());
			ov.setBlogcount(0);
			ov.setAppointmentcount(0);
			ovRepo.save(ov);
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
	@PostMapping(path="/admin/login",produces= {"application/json"},consumes= {"application/json"})
	@ResponseBody
	public ResponseEntity<ErrorResponse> adminLogin(@RequestBody AuthRequest authRequest){
		String type="";
		AdminLogin auth=adminRepo.findByUsername(authRequest.getUserName());
		boolean match=false;
		
		// match=p.matches(authRequest.getPassword(), auth.getPassword());
	
		if(authRequest.getPassword().equals(auth.getPassword())){
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
        return ResponseEntity.status(200).body(new ErrorResponse(jwtUtil.generateToken(authRequest.getUserName()),type));
	}
	else
	{
		return ResponseEntity.status(400).body(new ErrorResponse("Invalid username/password","400"));
	}
	}
	

	@PostMapping(path="/login",produces= {"application/json"},consumes= {"application/json"})
	@ResponseBody
	public ResponseEntity<ErrorResponse> login(@RequestBody AuthRequest authRequest){
		String type="";
		Users auth=repo.findByUserName(authRequest.getUserName());
		boolean match=false;
		if(auth!=null){
		 match=p.matches(authRequest.getPassword(), auth.getPassword());
		 type="Normal";
		}
		else 
		{
			Doctor auth1=doctorRepo.findByUserName(authRequest.getUserName());

			if(auth1.getStatus().toString().equals("false"))
			return ResponseEntity.status(200).body(new ErrorResponse("Your Status is false","200"));
			match=p.matches(authRequest.getPassword(), auth1.getPassword());
			type="Doctor";
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
        return ResponseEntity.status(200).body(new ErrorResponse(jwtUtil.generateToken(authRequest.getUserName()),type));
	}
	else
	{
		return ResponseEntity.status(400).body(new ErrorResponse("Invalid username/password","400"));
	}
	}
	@PostMapping(path="/addmedicine",produces= {"application/json"})
	@ResponseBody
	public ResponseEntity<ErrorResponse> addMedicine(@RequestParam("medicineImage") MultipartFile image, @RequestParam("name") String name, @RequestParam("description") String description, @RequestParam("company") String company,@RequestParam("mg") int mg,@RequestParam("category") String category,@RequestParam("price") int price, @RequestParam("quantity") int quantity){
		if(image.getOriginalFilename().contains("png")||image.getOriginalFilename().contains("jpg")||image.getOriginalFilename().contains("jpeg")||image.getOriginalFilename().contains("webp")){
			
	   Medicine medi=new Medicine();
	   medi.setCompany(company);
	   medi.setDesc(description);
	   medi.setToken(new Date().getTime());
	   medi.setFileName(image.getOriginalFilename()+new Date());
	   medi.setName(name);
	   medi.setCategory(category);
	   medi.setMg(mg);
	   medi.setPrice(price);
	   medi.setQuantity(quantity);
	   String msg=fileup.fileUpload(image);
	   if(!msg.equals("Error"))
	   {
		medi.setFileName(msg);
		medi.setId((Long) (new Date().getTime()));
		mediRepo.save(medi);
		return ResponseEntity.status(200).body(new ErrorResponse("Medicine added sucessfully","200"));
	   }
	   else
		return ResponseEntity.status(500).body(new ErrorResponse("There was an error while uploading the file","500"));
	}
	else
	{
		return ResponseEntity.status(400).body(new ErrorResponse("Only png, jpg and jpeg format is allowed","400"));
	}
	}
	@PostMapping(path="/doctor/addpost",produces= {"application/json"})
	@ResponseBody
	public ResponseEntity<ErrorResponse> addPost(@RequestParam("img") MultipartFile image, @RequestParam("username") String username, @RequestParam("des") String description, @RequestParam("title") String title,@RequestParam("date") String date,@RequestParam("type") String type){
		
		if(image.getOriginalFilename().contains("png")||image.getOriginalFilename().contains("jpg")||image.getOriginalFilename().contains("jpeg")||image.getOriginalFilename().contains("webp")){
			
	   Blog blog=new Blog();
	   blog.setDes(description);
	   blog.setTitle(title);
	   blog.setUsername(username);
	   blog.setType(type);
	   String msg=fileup.fileUpload(image);
	   if(!msg.equals("Error"))
	   {
		blog.setDate(date);
		blog.setFileName(msg);
		blog.setId((Long) (new Date().getTime()));
		blogRepo.save(blog);
		return ResponseEntity.status(200).body(new ErrorResponse("Post added sucessfully","200"));
	   }
	   else
		return ResponseEntity.status(500).body(new ErrorResponse("There was an error while uploading the file","500"));
	}
	else
	{
		return ResponseEntity.status(400).body(new ErrorResponse("Only png, jpg and jpeg format is allowed","400"));
	}
	}

    
    
}
/*
	 */