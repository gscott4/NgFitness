import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private user: User;

    constructor(private router: Router) {}
    
    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString() 
        };
        this.authChange.next(true);
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString() 
        };
        this.authSuccessfully();

    }

    logout() {
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    getUser() {
        // Returns a brand new object instead of an actual reference
        // So if other parts use this user it won't affect the service's object.
        return {...this.user};
    }

    // If user is null then he/she is authenticated
    isAuth() {
        return this.user != null;
    }

    private authSuccessfully() {
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}