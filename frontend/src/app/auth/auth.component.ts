import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserState } from '../states/user.state';
import { UpdatePseudo } from '../actions/user-action';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
    imports: [CommonModule, FormsModule, RouterLink],
})
export class AuthComponent implements OnInit {
    email = '';
    password = '';
    pseudo = '';
    isRegisterMode = false;
    isAuthenticated = false; // Track authentication state
    displayPseudo$: Observable<string>; // Store the logged-in user's username

    ngOnInit(): void {
        // Check if the user is already authenticated
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (accessToken && refreshToken) {
            this.apiService.getCurrentUser().subscribe(
                (user: any) => {
                    this.isAuthenticated = true;
                    this.store.dispatch(new UpdatePseudo(user.pseudo));
                },
                (error) => {
                    console.error('Error loading user info:', error)
                }
            );
        }
    }

    constructor(private apiService: ApiService, private store: Store) {
        this.displayPseudo$ = this.store.select(UserState.getPseudo);
    }

    toggleMode() {
        this.isRegisterMode = !this.isRegisterMode;
    }

    authenticate() {
        if (this.isRegisterMode) {
            this.apiService.register(this.email, this.pseudo, this.password).subscribe(
                (response) => {
                    console.log('Registered:', response);
                    alert('Registration successful! Please log in.');
                    this.toggleMode();
                },
                (error) => console.error('Error:', error)
            );
        }
        else {
            this.apiService.login(this.email, this.password).subscribe(
                (response: any) => {
                    console.log('Logged in:', response);
                    this.isAuthenticated = true;
                    console.log('User pseudo:', response.pseudo);
                    this.store.dispatch(new UpdatePseudo(response.pseudo));
                    // put the access token in the local storage
                    localStorage.setItem('accessToken', response.tokens.accessToken);
                    localStorage.setItem('refreshToken', response.tokens.refreshToken);
                },
                (error) => {
                    console.error('Error:', error);
                    switch (error.status) {
                        case 401:
                            alert('Email or password incorrect');
                            break;
                        default:
                            alert('An error occurred, probably a charly error');
                    }
                }
            );
        }
    }

    logout() {
        this.isAuthenticated = false;
        this.email = '';
        this.password = '';
        this.pseudo = '';
        this.store.dispatch(new UpdatePseudo(''));
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        alert('You have been logged out.');
    }
}
