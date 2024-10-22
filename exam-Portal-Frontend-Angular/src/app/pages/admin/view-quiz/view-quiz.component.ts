import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-quiz',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './view-quiz.component.html',
  styleUrl: './view-quiz.component.css'
})
export class ViewQuizComponent implements OnInit{

  quizes:any = [];
    errorMessage: string = '';
    successMessage: string = '';

   constructor(private http:HttpClient){}
   ngOnInit(): void {
    const token = localStorage.getItem('token');
      if (token) {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

          this.http.get('http://localhost:8080/quiz/', { headers })
              .subscribe(
                  (data:any) => {
                      this.quizes = data;
                      console.log('Quiz is fetched successfully', this.quizes);
                  },
                  (error: { status: number; }) => {
                      console.error('Error fetching categories:', error);
                      // Optionally, redirect to login if unauthorized
                      if (error.status === 401) {
                          // Redirect to login or show a message
                      }
                  }
              );
      } else {
          console.error('No token found, please log in.');
          // Redirect to login or show a message
      }
     }
     deleteQuiz(qId: number) {
        const token = localStorage.getItem('token');
        if (token) {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      
          const url = `http://localhost:8080/quiz/${qId}`;
      
          this.http.delete(url, { headers })
            .subscribe(
              (data: any) => {
                console.log('Quiz deleted successfully', qId);
                this.quizes = this.quizes.filter((quiz: any) => quiz.id !== qId);
                this.successMessage = 'Quiz deleted successfully!';
                this.errorMessage = '';
              },
              (error: { status: number; }) => {
                console.error('Error Deleting Quiz:', error);
                if (error.status === 401) {
                  this.errorMessage = 'Unauthorized access. Please log in.';
                } else if (error.status === 403) {
                  this.errorMessage = 'Forbidden: You do not have permission to delete this quiz.';
                } else if (error.status === 404) {
                  this.errorMessage = 'Quiz not found.';
                } else {
                  this.errorMessage = 'An error occurred while deleting the quiz. Please try again.';
                }
              }
            );
        } else {
          console.error('No token found, please log in.');
          this.errorMessage = 'No authentication token found. Please log in.';
        }
      }
      

   }

