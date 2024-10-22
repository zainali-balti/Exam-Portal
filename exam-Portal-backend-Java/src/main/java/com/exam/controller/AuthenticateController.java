package com.exam.controller;

import com.exam.config.JwtUtils;
import com.exam.model.JwtRequest;
import com.exam.model.JwtResponse;
import com.exam.model.Users;
import com.exam.service.Impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticateController {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/generate-token")
    private ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        System.out.println("Generate Token API called with username: " + jwtRequest.getUserName());
        System.out.println("Password: " + jwtRequest.getPassword());

        try {
            authenticate(jwtRequest.getUserName(), jwtRequest.getPassword());
        } catch (UsernameNotFoundException e) {
            e.printStackTrace();
            throw new Exception("User not found!");
        } catch (BadCredentialsException e) {
            System.out.println("Invalid Credentials: " + e.getMessage());
            throw new Exception("Invalid Credentials: Bad credentials");
        }

        UserDetails userDetails = this.userDetailsService.loadUserByUsername(jwtRequest.getUserName());
        System.out.println("UserDetails loaded for: " + jwtRequest.getUserName());

        String token = jwtUtils.generateToken(userDetails);
        System.out.println("Generated Token: " + token);

        return ResponseEntity.ok(new JwtResponse(token));
    }




    private void authenticate(String username, String password){
        System.out.println("Attempting to authenticate user: " + username);
        Authentication authentication =
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }


    @GetMapping("/current-user")
    private Users getCurrentUser(Principal principal){
        return (Users) this.userDetailsService.loadUserByUsername(principal.getName());
    }

}
