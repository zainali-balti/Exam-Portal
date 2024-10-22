import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-load-quiz-page',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './load-quiz-page.component.html',
  styleUrl: './load-quiz-page.component.css'
})
export class LoadQuizPageComponent implements OnInit{
  qId:any  = 0;
  quizes:any = [];
  
  constructor(private route:ActivatedRoute,private http:HttpClient){}
  ngOnInit(): void {
    this.qId = this.route.snapshot.params['qid'];
    console.log(this.qId);
    const token = localStorage.getItem('token');
    if (token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        this.http.get(`http://localhost:8080/quiz/${this.qId}`, { headers })
            .subscribe(
                (data:any) => {
                    this.quizes = data;
                    console.log('Quiz is fetched successfully', this.quizes);
                },
                (error: { status: number; }) => {
                    console.error('Error fetching categories:', error);
                }
            );
    } else {
        console.error('No token found, please log in.');
    }
  }

}
