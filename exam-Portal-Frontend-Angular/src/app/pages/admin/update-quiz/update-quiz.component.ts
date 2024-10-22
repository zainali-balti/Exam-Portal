import { Component, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-update-quiz',
  standalone: true,
  imports: [CommonModule, JsonPipe, FormsModule],
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'] // Corrected property name
})
export class UpdateQuizComponent implements OnInit {
  qId = 0;
  quizData: any = {
    title: '',
    description: '',
    maxMarks: 0,
    numberOfQuestions: 0,
    active: true,
    category: {
      cid: 0, 
    }
  };
  categori: any = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    const token = localStorage.getItem('token');
    this.qId = this.route.snapshot.params['qid'];

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      // Fetch the quiz details
      this.http.get(`http://localhost:8080/quiz/${this.qId}`, { headers })
        .subscribe(
          (data: any) => {
            this.quizData = data;
            console.log(this.quizData)
            // Ensure the category object is initialized
            if (!this.quizData.category) {
              this.quizData.category = { cId: 0 };
            }

            console.log('Quiz fetched successfully', this.quizData);
          },
          (error: { status: number; }) => {
            console.error('Error fetching Quiz:', error);
          }
        );

      // Fetch the categories
      this.http.get('http://localhost:8080/category/', { headers })
        .subscribe(
          (data: any) => {
            this.categori = data;
            console.log('Categories fetched successfully', this.categori);
          },
          (error: { status: number; }) => {
            console.error('Error fetching categories:', error);
          }
        );
    } else {
      console.error('No token found, please log in.');
    }
  }

  onSubmit() {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      
      console.log('Quiz data before update:', this.quizData)// For debugging

      this.http.put(`http://localhost:8080/quiz/`, this.quizData, { headers })
        .subscribe(
          (data: any) => {
            this.quizData = data;
            console.log('Quiz updated successfully', this.quizData);
          },
          (error: { status: number; }) => {
            console.error('Error updating Quiz:', error);
          }
        );
    } else {
      console.error('No token found, cannot update quiz.');
    }
  }
}
