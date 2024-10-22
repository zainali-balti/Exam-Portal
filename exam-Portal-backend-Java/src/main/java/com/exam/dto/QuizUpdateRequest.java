package com.exam.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuizUpdateRequest {

    private Long qId;
    private String title;
    private String description;
    private Integer maxMarks;
    private Integer numberOfQuestions;
    private boolean isActive = false;
    private String category;
}
