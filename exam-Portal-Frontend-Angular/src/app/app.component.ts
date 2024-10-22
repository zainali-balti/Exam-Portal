import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignupComponent } from "./pages/signup/signup.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { AdminDashboardComponent } from "./pages/admin/admin-dashboard/admin-dashboard.component";
import { NgxUiLoaderModule } from 'ngx-ui-loader';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignupComponent, NavbarComponent, AdminDashboardComponent,NgxUiLoaderModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'exam-portal';
}
