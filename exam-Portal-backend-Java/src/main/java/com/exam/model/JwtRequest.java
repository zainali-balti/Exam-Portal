package com.exam.model;

import jakarta.persistence.Entity;

public class JwtRequest {
    private String username;
    private String password;

   public JwtRequest(){

   }

    public JwtRequest(String userName, String password) {
        this.username = userName;
        this.password = password;
    }

    public String getUserName() {
        return username;
    }

    public void setUserName(String userName) {
        this.username = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
