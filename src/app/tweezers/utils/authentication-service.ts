import { Injectable } from '@angular/core';
import { TweezersApi } from './tweezers-api';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

declare let window: any;

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {    
    constructor(protected tweezApi: TweezersApi, protected router: Router, protected titleModule: Title) {
        titleModule.setTitle("Login - Tweezers");
    }

    public login(username: string, password: string) :Promise<any> {
        return this.tweezApi.login(username, password).then(res => {
            if (res) {
                localStorage.setItem("sessionId", res.sessionId);
            }
        });
    }

    public isLoggedIn() {
        return localStorage && !!localStorage["sessionId"];
    }
}