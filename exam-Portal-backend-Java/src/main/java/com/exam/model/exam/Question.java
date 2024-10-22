package com.exam.model.exam;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "question")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long quesId;
    @Column(length = 5000)
    private String content;
    @Column(nullable = true)
    private String image;
    private String opt1;
    private String opt2;
    private String opt3;
    private String opt4;
    private String answer;
    @ManyToOne(fetch = FetchType.EAGER)
    private Quiz quiz;
}
