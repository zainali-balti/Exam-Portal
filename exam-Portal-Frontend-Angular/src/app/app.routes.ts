import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { UserGuard } from './services/user.guard';
import { Component } from '@angular/core';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoryComponent } from './pages/admin/view-category/view-category.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizComponent } from './pages/admin/view-quiz/view-quiz.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuestionComponent } from './pages/admin/view-question/view-question.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { LoadUserComponent } from './pages/user/load-user/load-user.component';
import { LoadQuizPageComponent } from './pages/user/load-quiz-page/load-quiz-page.component';
import { StratQuizComponent } from './pages/user/strat-quiz/strat-quiz.component';
import { UserUpdateComponent } from './pages/admin/user-update/user-update.component';

export const routes: Routes = [
    {path:'signup', component:SignupComponent},
    {path:'login', component:LoginComponent},
    {
      path: 'start-quiz/:qid',
      component: StratQuizComponent,
    },
    {
      path:'user-dashboard',
       component:UserDashboardComponent,
        canActivate:[UserGuard],
        children: [
          {
            path: ':cid',
            component: LoadUserComponent,
          },
          {
            path: 'load-quiz-page/:qid',
            component: LoadQuizPageComponent,
          },
        
        ]
      },
    {
      path: 'admin-dashboard',
      component: AdminDashboardComponent,
      canActivate: [AdminGuard],
      children: [
        {
          path: 'welcome',
          component: WelcomeComponent
        },
        {
          path: 'profile',
          component: ProfileComponent
        },
        {
          path: 'user-update/:id/:userName',
          component: UserUpdateComponent
        },
        {
          path: 'view-category',
          component: ViewCategoryComponent
        },
        {
          path: 'add-category',
          component: AddCategoryComponent
        },
        {
          path: 'view-quiz',
          component: ViewQuizComponent
        },
        {
          path: 'add-quiz',
          component: AddQuizComponent
        },
        {
          path: 'update/:qid',
          component: UpdateQuizComponent
        },
        {
          path: 'question/:qid/:qtitle',
          component: ViewQuestionComponent
        },
        {
          path: 'add-question/:qid/:qtitle',
          component: AddQuestionComponent
        },
        {
          path: 'update-question/:quesId',
          component: UpdateQuestionComponent
        },
        { path: '', redirectTo: 'welcome', pathMatch: 'full' } 
      ]
    },
    { path: '**', redirectTo: 'admin-dashboard/welcome' }
    
];
