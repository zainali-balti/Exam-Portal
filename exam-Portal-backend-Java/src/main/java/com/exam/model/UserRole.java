package com.exam.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.apache.catalina.User;

@Entity
@Data
@EqualsAndHashCode
public class UserRole {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long userRoleId;
    @ManyToOne(fetch = FetchType.EAGER)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Users users;
    @ManyToOne
    private Roles roles;
}
