package com.exam.service.Impl;

import com.exam.model.Users;
import com.exam.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepo userRepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users users = this.userRepo.findByUserName(username);
        if (users == null){
            throw new UsernameNotFoundException("Sorry we Don't Found this Name of User!");
        }
        return users;
    }
}
