import { Component,OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-sidebar-user',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './sidebar-user.component.html',
  styleUrl: './sidebar-user.component.css'
})
export class SidebarUserComponent implements OnInit{

  categories:any = [];
  showCategories: boolean = false; 

  constructor(public loginService:LoginService, private http:HttpClient){}

  ngOnInit(): void {
    this.fetchCategories();
  }


  logout(){
    this.loginService.loggedOut();
    window.location.reload();
  }

  fetchCategories() {
    const token = localStorage.getItem('token');
    if (token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        this.http.get('http://localhost:8080/category/', { headers })
            .subscribe(
                (data: any) => {
                    this.categories = data;
                    console.log('Categories fetched successfully', this.categories);
                },
                (error) => {
                    console.error('Error fetching categories:', error);
                }
            );
    } else {
        console.error('No token found, please log in.');
    }
}
toggleCategories(): void {
  this.showCategories = !this.showCategories;
}

}
