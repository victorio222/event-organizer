package com.example.demo.Controller;

import com.example.demo.Model.Event;
import com.example.demo.Model.User;
import com.example.demo.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.relation.Role;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/users")
    public List<User> getAllUser(){
        return userService.getAllUser();
    }

    @GetMapping("/users/{userID}")
    public List<User> getUserByID(@PathVariable Long userID){
        return userService.getUserByID(userID);
    }

    @GetMapping("/admin")
    public List<User> getAllAdmin(){
        return userService.getAllAdmin();
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        Optional<User> existingUser = userService.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Username already in use");
        }
        userService.registerUser(user.getUsername(), user.getPassword(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getRole(), user.getPhoneNumber());
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> existingUser = userService.findByUsername(user.getUsername());

        if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())){
            User users = existingUser.get();
            return ResponseEntity.ok(users);
        }
        return ResponseEntity.status(401).body("Invalid username or password");
    }

    @PostMapping("/admin/add")
    public ResponseEntity<?> addAdmin(@RequestBody User user) {
        Optional<User> existingUser = userService.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Username already in use");
        }
        userService.addNewAdmin(user.getUsername(), user.getPassword(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getRole(), user.getStatus(), user.getColleges().getDepartmentID(), user.getPhoneNumber());
        return ResponseEntity.ok("Admin added successfully");
    }


    @PutMapping("admin/{id}/status")
    public ResponseEntity<String> changeStatus(@PathVariable Long id){
        try {
            userService.updateStatus(id);
            return ResponseEntity.ok("Changed status successfully");
        } catch (IllegalArgumentException e){
            return ResponseEntity.badRequest()
                    .body("Invalid data: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error handling change status: " + e.getMessage());
        }
    }

    @PutMapping("/user/{id}/update")
    public ResponseEntity<User> updateAccount(@PathVariable Long id, @RequestBody User updatedAccount) {
        try {
            User user = userService.updateAccount(id, updatedAccount);
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/user/{id}/updatePassword")
    public ResponseEntity<User> updateAccountPassword(@PathVariable Long id, @RequestBody User updateAccountPassword) {
        try {
            User user = userService.updateAccountPassword(id, updateAccountPassword);
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

