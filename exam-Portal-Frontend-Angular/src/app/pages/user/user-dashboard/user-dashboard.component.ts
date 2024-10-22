import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarUserComponent } from "../sidebar-user/sidebar-user.component";
@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterOutlet, SidebarUserComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

}
