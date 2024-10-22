package com.exam.service.Impl;

import com.exam.model.UserRole;
import com.exam.model.Users;
import com.exam.repo.RoleRepo;
import com.exam.repo.UserRepo;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Set;

@Service
public class UsersImpl implements UserService {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private RoleRepo roleRepo;
    @Override
    public Users createUsers(Users users, Set<UserRole> userRoles) throws Exception {
        Users checkUsers = this.userRepo.findByUserName(users.getUserName());
        if (checkUsers!=null){
            System.out.println("User is already Crated");
            throw new Exception("User is created");
        }
        else {
            for (UserRole userRoleAdded: userRoles
                 ) {
                roleRepo.save(userRoleAdded.getRoles());
            }
            users.getUserRoles().addAll(userRoles);
            checkUsers = this.userRepo.save(users);
        }
        return checkUsers;
    }

    @Override
    public Users getUserName(String userName) {
        return this.userRepo.findByUserName(userName);
    }

    @Override
    public void deleteUser(Long userId) {
        this.userRepo.deleteById(userId);
    }
    @Override
    public Users updateUser(Long userId, Users updatedUser) throws Exception {
        Users existingUser = this.userRepo.findById(userId)
                .orElseThrow(() -> new Exception("User not found"));

        // Update user fields as needed
        existingUser.setUserName(updatedUser.getUserName());
        existingUser.setFirstName(updatedUser.getFirstName());
        existingUser.setLastName(updatedUser.getLastName());
        existingUser.setPassword(updatedUser.getPassword());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPhoneNo(updatedUser.getPhoneNo());
        existingUser.setProfile(updatedUser.getProfile());
        existingUser.setEnabled(updatedUser.isEnabled());

        // Handle roles if necessary
        if (updatedUser.getUserRoles() != null) {
            existingUser.setUserRoles(updatedUser.getUserRoles());
        }

        return this.userRepo.save(existingUser);
    }


}
