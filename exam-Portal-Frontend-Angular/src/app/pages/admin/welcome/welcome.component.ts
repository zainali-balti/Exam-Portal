import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

  constructor(public loginService:LoginService){}

}
