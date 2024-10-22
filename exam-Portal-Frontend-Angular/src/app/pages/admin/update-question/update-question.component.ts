import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-update-question',
  standalone: true,
  imports: [CommonModule,JsonPipe,FormsModule],
  templateUrl: './update-question.component.html',
  styleUrl: './update-question.component.css'
})
export class UpdateQuestionComponent implements OnInit {
  id:any = 0;
  question:any = {
    content:'',
    opt1:'',
    opt2:'',
    opt3:'',
    opt4:'',
    answer:'',
    quiz:{
       qid:0
    }
  }


  constructor(private route:ActivatedRoute,private http:HttpClient){}
  ngOnInit(): void {

    const token = localStorage.getItem('token');
    this.id = this.route.snapshot.params['quesId'];

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      // Fetch the quiz details
      this.http.get(`http://localhost:8080/question/${this.id}`, { headers })
        .subscribe(
          (data: any) => {
            this.question = data;
            console.log(this.question);

            console.log('Question fetched successfully', this.question);
          },
          (error: { status: number; }) => {
            console.error('Error fetching Question:', error);
          }
        );
    
  }
}

submit(){

  const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      // Fetch the quiz details
      this.http.put(`http://localhost:8080/question/`,this.question, { headers })
        .subscribe(
          (data: any) => {
            this.question = data;
            console.log(this.question)

            console.log('Question updated successfully', this.question);
          },
          (error: { status: number; }) => {
            console.error('Error updated Question:', error);
          }
        );
    
  }


}

}
