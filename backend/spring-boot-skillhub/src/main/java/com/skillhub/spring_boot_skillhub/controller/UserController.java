package com.skillhub.spring_boot_skillhub.controller;

import com.skillhub.spring_boot_skillhub.dao.UsersRepository;
import com.skillhub.spring_boot_skillhub.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*") // allow React frontend
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private final UsersRepository userRepository;

    public UserController(UsersRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User savedUser = userRepository.save(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword());

        if (existingUser.isPresent()) {
            return ResponseEntity.ok(existingUser.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}

