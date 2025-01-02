import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account',
  standalone: true,
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  imports: [CommonModule, RouterModule, FormsModule]
})
export class AccountComponent implements OnInit {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const token = this.authService.getToken();
    if (token) {
      // Decode token to get user info (if needed)
      const user = JSON.parse(atob(token.split('.')[1]));
      this.username = user.username;
    }
  }

  onUpdate(): void {
    if(this.password === '' || this.confirmPassword === '') {
      this.errorMessage = 'Password and confirm password are required.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.authService.updateAccount(this.username, this.password).subscribe({
      next: () => {
        this.successMessage = 'Account updated successfully !';
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to update account.';
        this.successMessage = '';
      }
    });

  }
}
