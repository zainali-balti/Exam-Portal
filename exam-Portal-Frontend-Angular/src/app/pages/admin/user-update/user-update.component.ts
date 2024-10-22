import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [CommonModule,FormsModule,JsonPipe],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent implements OnInit{

  userName:string = '';
  userId:number = 0;
  userData:any = {
    userName:'',
    firstName: '',
    lastName: '',
    email:'',
    password:'',
    enabled : true,
    authorities:[{ authority: '' }]
  };
  availableAuthorities: string[] = ['admin', 'user']; 

  constructor(private route:ActivatedRoute,private http:HttpClient){}
  ngOnInit(): void {
    this.getUser();
  }
  getUser(): void {
    const token = localStorage.getItem('token');
    this.userName = this.route.snapshot.params['userName'];

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.get(`http://localhost:8080/users/${this.userName}`, { headers })
        .subscribe(
          (data: any) => {
            this.userData = data;
            console.log("userData is here!..",this.userData);
          },
          (error: { status: number; }) => {
            console.error('Error fetching user Data:', error);
          }
        );
      }
    }
    updateUser(){
      const token = localStorage.getItem('token');
      this.userId = this.route.snapshot.params['id'];
      if (token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        this.http.put(`http://localhost:8080/users/${this.userId}`, this.userData, { headers })
          .subscribe(
            (data: any) => {
              this.userData = data;
              console.log(this.userData);
              console.log("user is updated!");
            },
            (error: { status: number; }) => {
              console.error('Error updating user Data:', error);
            }
          );
        }
    }
}
