import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
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
  originalUsername: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const token = this.authService.getToken();
    if (token) {
      const user = JSON.parse(atob(token.split('.')[1]));
      this.username = user.username;
      this.originalUsername = user.username;
    }
  }

  onUpdate(): void {
    if (this.password && this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const updatePayload: any = {};
    
    if (this.username && this.username !== this.originalUsername) {
      updatePayload.username = this.username;
    }
    
    if (this.password) {
      updatePayload.password = this.password;
    }

    // check if there's anything to update
    if (Object.keys(updatePayload).length === 0) {
      this.errorMessage = 'No changes detected.';
      return;
    }

    this.authService.updateAccount(updatePayload.username, updatePayload.password).subscribe({
      next: () => {
        this.successMessage = 'Account updated successfully!';
        this.errorMessage = '';
        this.originalUsername = this.username;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to update account.';
        this.successMessage = '';
      }
    });
  }

  clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }
}
