package com.exam.model.exam;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long cId;
    private String title;
    private String description;
    @OneToMany(mappedBy = "category",cascade =  CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Quiz> quizSet = new LinkedHashSet<>();
}
