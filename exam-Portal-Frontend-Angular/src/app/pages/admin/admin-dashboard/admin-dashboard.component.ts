import { Component } from '@angular/core';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { ProfileComponent } from "../../profile/profile.component";
import { ViewCategoryComponent } from "../view-category/view-category.component";
import { AddCategoryComponent } from '../add-category/add-category.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [SideBarComponent, ProfileComponent, ViewCategoryComponent, AddCategoryComponent, RouterOutlet],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
