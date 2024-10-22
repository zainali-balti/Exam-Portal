// add-quiz.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [FormsModule,CommonModule,JsonPipe],
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent implements OnInit {

  categories: any = [];
  quizes= {
    title: '',
    description: '',
    maxMarks: 0,
    numberOfQuestions: 0,
    active: true,
    category:{
        cid:0
    }
  };

  // Feedback messages
  successMessage: string = '';
  errorMessage: string = '';
  
 
  constructor(private http: HttpClient,private loginService:LoginService) { }
  
  ngOnInit(): void {
    this.fetchCategories();
  }

  // Fetch categories from the backend
  fetchCategories(): void {
    const token = this.loginService.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.get('http://localhost:8080/category/', { headers })
        .subscribe(
          (data:any) => {
            this.categories = data;
            console.log("Token of category:", token)
            console.log('Categories fetched successfully', this.categories);
          },
          error => {
            console.error('Error fetching categories:', error);
            if (error.status === 401) {
              this.errorMessage = 'Unauthorized access. Please log in.';
              // Optionally, redirect to login
            } else {
              this.errorMessage = 'Failed to load categories. Please try again later.';
            }
          }
        );
    } else {
      console.error('No token found, please log in.');
      this.errorMessage = 'No authentication token found. Please log in.';
      // Optionally, redirect to login
    }
  }

  // Handle form submission
  onSubmit(): void {
    const token = localStorage.getItem('token')
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      const url = `http://localhost:8080/quiz/`
      this.http.post(url, this.quizes, { headers })
        .subscribe(
          (data:any) => {
            this.quizes = data;
            console.log('Quiz added successfully', this.quizes);
            this.successMessage = 'Quiz added successfully!';
            this.errorMessage = '';
            this.resetForm();
          },
          error => {
            console.error('Error adding quiz:', error);
            if (error.status === 401) {
              this.errorMessage = 'Unauthorized access. Please log in.';
            } else {
              this.errorMessage = 'Failed to add quiz. Please try again.';
            }
          }
        );
    } else {
      console.error('No token found, please log in.');
      this.errorMessage = 'No authentication token found. Please log in.';
    }
  }
  resetForm(): void {
    this.quizes = {
      title: '',
      description: '',
      maxMarks: 0,
      numberOfQuestions: 0,
      active: true,
      category:{
        cid:0
      }
    };
  }
}
