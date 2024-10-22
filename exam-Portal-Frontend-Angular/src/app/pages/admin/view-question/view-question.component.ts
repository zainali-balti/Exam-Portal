import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-view-question',
  standalone: true,
  imports: [CommonModule,RouterLink,JsonPipe],
  templateUrl: './view-question.component.html',
  styleUrl: './view-question.component.css'
})
export class ViewQuestionComponent implements OnInit{
 
  qId=0;
  qTitle='';
  questions: any = [];
   // Feedback messages
   successMessage: string = '';
   errorMessage: string = '';
  constructor(private route:ActivatedRoute,private http:HttpClient){}

  ngOnInit(): void {
    this.qId = this.route.snapshot.params['qid'];
    this.qTitle  = this.route.snapshot.params['qtitle'];
    console.log(this.qTitle)
    this.gettingQuestions();
    
  }
  gettingQuestions(){

    const token = localStorage.getItem('token');
      if (token) {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

          this.http.get(`http://localhost:8080/question/quiz/${this.qId}`, { headers })
              .subscribe(
                  (data:any) => {
                      this.questions = data;
                      console.log('Questions  fetched successfully', this.questions);
                  },
                  (error: { status: number; }) => {
                      console.error('Error fetching Questions:', error);
                      if (error.status === 401) {
                      }
                  }
              );
      } else {
          console.error('No token found, please log in.');
      }
  }
  deleteQues(id:any){
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      const url = `http://localhost:8080/question/${id}`;
  
      this.http.delete(url, { headers })
        .subscribe(
          (data: any) => {
            console.log('Quiz deleted successfully', id);
            this.questions = this.questions.filter((quiz: any) => this.questions.quesId !== id);
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
