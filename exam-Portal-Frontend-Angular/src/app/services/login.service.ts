import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import baseUrl from './Url'; // Ensure this is correctly imported
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private token: string;

  constructor(private http: HttpClient) { 
    this.token = localStorage.getItem('token') || ''; 
  }

  // Generate tokens by sending login data to backend
  public generateTokens(login: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${baseUrl}/generate-token`, login, { headers });
  }

  // Retrieve the current user using the token
  public getCurrentUser() {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${baseUrl}/current-user`, { headers });
  }

  // Log in by storing the token
  public logIn(token: string): void {
    localStorage.setItem('token', token);
    this.token = token; 
  }

  // Check if the user is logged in
  public isLoggedIn(): boolean {
    const tokenValue = this.getToken(); 
    return  tokenValue !== null && tokenValue.trim() !== '' && tokenValue !== undefined ;
  }

  // Log out the user
  public loggedOut(): boolean {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.token = '';
    return true;
  }

  // Retrieve the token from localStorage
  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Store user information in localStorage
  public setUsers(user: any): void {
    localStorage.setItem("user", JSON.stringify(user));
  }

  // Retrieve user information from localStorage
  public getUser(): any | null {
    const userValue = localStorage.getItem('user');
    if (userValue != null) {
      return JSON.parse(userValue);
    } else {
      this.loggedOut();
      return null;
    }
  }

  // Retrieve the user's role
  public getUserRole(): string | null {
    const user = this.getUser();
    console.log('Retrieved user from storage:', user);
    if (user && user.authorities && user.authorities.length > 0) {
      return user.authorities[0].authority;
    } else {
      console.error('User or authorities is null/undefined.');
      return null;
    }
  }
}
