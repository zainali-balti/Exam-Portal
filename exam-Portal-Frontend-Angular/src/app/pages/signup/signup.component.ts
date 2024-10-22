import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private userService:UserService, private router:Router){}
    public users = {
    userName: '',
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    phoneNo: ''
  };

  submit(){
    return this.userService.addUsers(this.users).subscribe((data)=>{
      console.log(data)
      this.router.navigate(['login']);
    }
  
    );
  }

}
