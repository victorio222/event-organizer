package com.example.demo.Service;

import com.example.demo.Model.Colleges;
import com.example.demo.Model.User;
import com.example.demo.Repository.CollegesRepository;
import com.example.demo.Repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    private final CollegesRepository collegesRepository;

    public UserService(UserRepository userRepository, CollegesRepository collegesRepository ) {
        this.userRepository = userRepository;
        this.collegesRepository = collegesRepository;
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> getAllUser() {
        return userRepository.findByRole(User.Role.User);
    }

    public List<User> getAllAdmin() {
        return userRepository.findByRole(User.Role.Admin);
    }

    public List<User> getUserByID(Long userID) {
        return userRepository.findByUserID(userID);
    }

    public User registerUser(String username, String password, String firstName, String lastName, String email, User.Role role, String phoneNumber) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password); // In production, hash the password
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setRole(role != null ? role : User.Role.User); // Default to 'USER' if no role is provided
        user.setPhoneNumber(phoneNumber);
        return userRepository.save(user);
    }

    public User addNewAdmin(String username, String password, String firstName, String lastName, String email, User.Role role, String status, Long departmentID, String phoneNumber) {
        Colleges colleges = collegesRepository.findByDepartmentID(departmentID)
                .orElseThrow(() -> new RuntimeException("Department not found"));

        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setRole(User.Role.Admin);
        user.setStatus("Inactive");
        user.setColleges(colleges);
        user.setPhoneNumber(phoneNumber);
        return userRepository.save(user);
    }

    public void updateStatus(Long id) {
        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getStatus().equalsIgnoreCase("Active")) {
                user.setStatus("Inactive");
            } else {
                user.setStatus("Active");
            }
            userRepository.save(user);
        } else {
            throw new EntityNotFoundException("User with ID: " + id + " not found");
        }
    }

    public User updateAccount(Long id, User updatedAccount) {
        return userRepository.findById(id).map(user -> {
            user.setFirstName(updatedAccount.getFirstName());
            user.setLastName(updatedAccount.getLastName());
            user.setEmail(updatedAccount.getEmail());
            user.setUpdatedAt(updatedAccount.getUpdatedAt());
            return userRepository.save(user);
        }).orElseThrow(() -> new IllegalArgumentException("user not found with ID: " + id));
    }

    public User updateAccountPassword(Long id, User updateAccountPassword) {
        return userRepository.findById(id).map(user -> {
            user.setPassword(updateAccountPassword.getPassword());
            return userRepository.save(user);
        }).orElseThrow(() -> new IllegalArgumentException("user not found with ID: " + id));
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
