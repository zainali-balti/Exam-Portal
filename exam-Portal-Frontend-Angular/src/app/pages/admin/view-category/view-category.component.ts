import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-view-category',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './view-category.component.html',
  styleUrl: './view-category.component.css'
})
export class ViewCategoryComponent implements OnInit{
    categories: any = [];

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.fetchCategories();

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
  

}
