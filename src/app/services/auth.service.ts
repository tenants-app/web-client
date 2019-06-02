import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {BehaviorSubject} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {SnackBarService} from './snack-bar.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private loggedIn = new BehaviorSubject<boolean>(false);

    constructor(private apiService: ApiService,
                private jwtHelper: JwtHelperService,
                private router: Router,
                private snackBar: SnackBarService) {
    }

    get isLoggedIn() {
        if (localStorage.getItem('token')) {
            this.loggedIn.next(true);
        }
        return this.loggedIn.asObservable();
    }

    public register(userData) {
        this.apiService.post('/auth/register', userData).subscribe(res => {
            this.handleAuthData(res.user);
            this.snackBar.show('Konto zostało utworzone');
        });
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !!token && !this.jwtHelper.isTokenExpired(token);
    }

    public login(userData) {
        this.apiService.post('/auth/login', userData).subscribe(res => {
            this.handleAuthData(res.user);
        });
    }

    public logout() {
        localStorage.removeItem('token');
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
        this.snackBar.show('Wylogowano');
    }

    public handleAuthData(data) {
        localStorage.setItem('token', data.token);
        this.loggedIn.next(true);
        this.router.navigate(['/']);
        this.snackBar.show('Jesteś teraz zalogowany');
    }
}
