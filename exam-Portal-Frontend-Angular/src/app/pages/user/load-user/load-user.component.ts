import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-load-user',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './load-user.component.html',
  styleUrl: './load-user.component.css'
})
export class LoadUserComponent implements OnInit{
  cId:any = 0;
  quizes:any = [];
  constructor(private route:ActivatedRoute,private http:HttpClient){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cId = params['cid']; 
      console.log("CatId",this.cId);
      if(this.cId == 0){
      const token = localStorage.getItem('token');
      if (token) {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          this.http.get('http://localhost:8080/quiz/active', { headers })
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
    else{
      const token = localStorage.getItem('token');
      if (token) {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          this.http.get(`http://localhost:8080/quiz/category/active/${this.cId}`, { headers })
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
    
    });
    
  }
 

}
