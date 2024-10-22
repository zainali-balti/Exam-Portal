package com.exam.controller;

import com.exam.model.Roles;
import com.exam.model.UserRole;
import com.exam.model.Users;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/users")
@CrossOrigin("http://localhost:4200/")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @PostMapping("/")
    public Users createUser(@RequestBody Users users) throws Exception {
        users.setProfile("default.png");
        users.setPassword(bCryptPasswordEncoder.encode(users.getPassword()));
        Set<UserRole> userRoles = new HashSet<>();
        Roles roles = new Roles();
        roles.setRoleId(10L);
        roles.setRoleName("user");

        UserRole userRole = new UserRole();
        userRole.setUsers(users);
        userRole.setRoles(roles);

        userRoles.add(userRole);
        users.setUserRoles(userRoles);

        System.out.println("Creating user: " + users);
        try {
            return this.userService.createUsers(users, userRoles);
        } catch (Exception e) {
            e.printStackTrace();  // Log the error
            throw new Exception("Failed to create user: " + e.getMessage());
        }
    }

    @GetMapping("/{userName}")
    public Users getUserName(@PathVariable String userName){
        return this.userService.getUserName(userName);
    }

    @DeleteMapping("/{userId}")
    public void DeleteUser(@PathVariable Long userId){
        this.userService.deleteUser(userId);
    }
    @PutMapping("/{userId}")
    public Users updateUser(@PathVariable Long userId, @RequestBody Users updatedUser) throws Exception {
        try {
            return this.userService.updateUser(userId, updatedUser);
        } catch (Exception e) {
            e.printStackTrace();  // Log the error
            throw new Exception("Failed to update user: " + e.getMessage());
        }
    }



}
