import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  categories = {
    title:'',
    description:'',
  };

  // Feedback messages
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private http:HttpClient){}

  submit(){
    const token = localStorage.getItem('token');
    if (token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        this.http.post('http://localhost:8080/category/',this.categories, { headers })
            .subscribe(
                (data:any) => {
                    this.categories = data;
                    console.log('Add Categories successfully', this.categories);
                    this.successMessage = 'Quiz added successfully!';
                    this.errorMessage = '';
                    this.resetForm();
                },
                (error: { status: number; }) => {
                    console.error('Error fetching categories:', error);
                    if (error.status === 401) {
                        // Redirect to login or show a message
                        this.errorMessage = 'Unauthorized access. Please log in.';
                    }
                }
            );
    } else {
        console.error('No token found, please log in.');
        // Redirect to login or show a message
    }
}

resetForm(): void {
    this.categories = {
      title: '',
      description: '',
    };
  }
}

