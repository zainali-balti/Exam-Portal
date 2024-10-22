import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  constructor(public loginService:LoginService){}

  logOut(){
    this.loginService.loggedOut();
    window.location.reload();
  }

}
