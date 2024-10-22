package com.exam;

import com.exam.model.Roles;
import com.exam.model.UserRole;
import com.exam.model.Users;
import com.exam.service.Impl.UsersImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.management.relation.Role;
import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class ExamApplication {
	public static void main(String[] args) {
		SpringApplication.run(ExamApplication.class, args);
	}
}
