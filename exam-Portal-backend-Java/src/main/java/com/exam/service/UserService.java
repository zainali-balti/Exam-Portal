package com.exam.service;

import com.exam.model.UserRole;
import com.exam.model.Users;

import java.util.Optional;
import java.util.Set;

public interface UserService {

    Users createUsers(Users users, Set<UserRole> userRoles) throws Exception;
    Users getUserName(String userName);
    void deleteUser(Long userId);
    Users updateUser(Long userId, Users updatedUser) throws Exception;

}

