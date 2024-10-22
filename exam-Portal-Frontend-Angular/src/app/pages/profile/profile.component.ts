import { Component,OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { JsonPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    JsonPipe,
    CommonModule,
    RouterLink
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  user: any = {}; 
  constructor(private loginService:LoginService){}

  ngOnInit(): void {

    this.user = this.loginService.getUser();
    
  }
  printPage(){
    window.print();
  }


}
