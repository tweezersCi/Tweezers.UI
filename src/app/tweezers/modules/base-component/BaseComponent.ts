import { TweezersCache } from '../../utils/tweezers-cache';
import { TweezersApi } from '../../utils/tweezers-api';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../../utils/authentication-service';

@Component({
    selector: 'base-component',
    template: ''
})
export class BaseComponent {
    constructor(protected tweezCache: TweezersCache, protected tweezApi: TweezersApi,
        protected router: Router, protected titleModule: Title, protected authService:AuthenticationService) {
        
    }
}