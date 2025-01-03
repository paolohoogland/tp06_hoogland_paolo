import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // console.log('received token: ' + response.token);
        // -> now receiving accesstoken & refreshtoken
        console.log('received accessToken: ' + response.accessToken);
        console.log('received refreshToken: ' + response.refreshToken);

        this.authService.storeToken(response.token); 
        // -> now storing accesstoken & refreshtoken
        // this.authService.storeAccessToken(response.accesstoken);
        // this.authService.storeRefreshToken(response.refreshtoken);

        this.router.navigate(['/produits']);
      },
      error: (err) => {
        this.errorMessage = 'Invalid username or password !';
      }
    });
  }
}
