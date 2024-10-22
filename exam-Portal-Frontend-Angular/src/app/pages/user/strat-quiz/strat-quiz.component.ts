import { Component,OnInit } from '@angular/core';
import { CommonModule, LocationStrategy } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MinutesSecondsPipe } from '../minutes-seconds.pipe';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-strat-quiz',
  standalone: true,
  imports: [CommonModule,FormsModule,MinutesSecondsPipe,RouterLink],
  templateUrl: './strat-quiz.component.html',
  styleUrl: './strat-quiz.component.css'
})
export class StratQuizComponent implements OnInit{
  qId:any = 0;
  questions:any = [];
  quiz:any = [];
  correctAnswer:number = 0;
  obtainedMarks:number = 0;
  attempted:number = 0;
  isSubmit:boolean = false;
  timeLeft: number = 0; 
  interval: any;

  constructor(private route:ActivatedRoute,private http:HttpClient,private locationState:LocationStrategy){}
  ngOnInit(): void {
    this.qId = this.route.snapshot.params['qid'];
    console.log("QuizID:",this.qId);
    const token = localStorage.getItem('token');
    if (token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        this.http.get(`http://localhost:8080/question/quiz/${this.qId}`, { headers })
            .subscribe(
                (data:any) => {
                    this.questions = data;
                    this.questions.forEach((element:any) => {
                      element['userAns'] = '';
                    });
                    console.log('Questions  fetched successfully', this.questions);
                    this.setTimerForQuestions();
                },
                (error: { status: number; }) => {
                    console.error('Error fetching Questions:', error);
                }
            );
    } else {
        console.error('No token found, please log in.');
    }
    this.stopBackButton();
  }
  stopBackButton(){
    history.pushState(null, '', location.href);
    this.locationState.onPopState(()=>{
      history.pushState(null, '', location.href);
    })
  }
    setTimerForQuestions() {
      const timePerQuestion = 60; 
      this.timeLeft = this.questions.length * timePerQuestion; 
      this.startTimer();
    }
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.submit(); 
      }
    }, 1000); 
  }

  submit(){
    this.isSubmit = true;
    clearInterval(this.interval);
    this.questions.forEach((q:any)=>{
      if(q.userAns == q.answer){
        this.correctAnswer++;
        let eachMarks = this.questions[0].quiz.maxMarks/this.questions.length;
        this.obtainedMarks += eachMarks;

      }
      if(q.userAns.trim() != ''){
        this.attempted++;
      }
    })
    console.log(this.obtainedMarks);
    console.log(this.attempted);
    console.log(this.correctAnswer);
    
  }
  pagePrint(){
    window.print();
  }

}
