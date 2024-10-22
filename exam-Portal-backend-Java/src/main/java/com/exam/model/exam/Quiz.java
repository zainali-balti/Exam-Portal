package com.exam.model.exam;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "quiz")
public class Quiz implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long qId;
    private String title;
    private String description;
    private Integer maxMarks;
    private Integer numberOfQuestions;
    private boolean isActive = false;
    @ManyToOne(fetch = FetchType.LAZY)
    private Category category;
    @OneToMany(mappedBy = "quiz",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Question> questionSet = new HashSet<>();
}
