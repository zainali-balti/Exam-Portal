import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

  constructor(public loginService:LoginService){}

  logout(){
    this.loginService.loggedOut();
    window.location.reload();
  }

}
