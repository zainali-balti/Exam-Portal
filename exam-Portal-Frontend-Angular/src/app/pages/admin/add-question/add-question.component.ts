import { Component,OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [JsonPipe,FormsModule,CommonModule],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent implements OnInit{

  qid:any = 0;
  qTitle:any = '';
  question:any = {
    quiz:{},
    content:'',
    opt1:'',
    opt2:'',
    opt3:'',
    opt4:'',
    answer:'',
  }

    // Feedback messages
    successMessage: string = '';
    errorMessage: string = '';

  constructor(private route:ActivatedRoute,private http:HttpClient){}

  ngOnInit(): void { 

    this.qid = this.route.snapshot.params['qid'];
    console.log(this.qid)
    this.qTitle = this.route.snapshot.params['qtitle'];
    console.log(this.qTitle)
    this.question.quiz['qid'] = this.qid;
    
  }
  submit(){
    if(this.question.content.trim() == '' || this.question.content == null){
      return;
    }
    if(this.question.opt1.trim() == '' || this.question.opt1 == null){
      return;
    }
    if(this.question.opt2.trim() == '' || this.question.opt2 == null){
      return;
    }
    if(this.question.opt3.trim() == '' || this.question.opt3 == null){
      return;
    }
    if(this.question.opt4.trim() == '' || this.question.opt4 == null){
      return;
    }
    if(this.question.answer.trim() == '' || this.question.answer == null){
      return;
    }
    const token = localStorage.getItem('token');
    if (token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        this.http.post('http://localhost:8080/question/',this.question, { headers })
            .subscribe(
                (data:any) => {
                    this.question = data;
                    console.log('Add Question successfully', this.question);
                    this.successMessage = 'Question added successfully!';
                    this.errorMessage = '';
                },
                (error: { status: number; }) => {
                    console.error('Error Added Question:', error);
                    if (error.status === 401) {
                        this.errorMessage = 'Unauthorized access. Please log in.';
                    }
                }
            );
    } else {
        console.error('No token found, please log in.');
    }
}

}
