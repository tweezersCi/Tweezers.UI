import { Injectable, Output } from '@angular/core';
import { TweezersApi } from './tweezers-api';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { EventEmitter } from 'events';

declare let window: any;

@Injectable({
    providedIn: 'root'
})
export class SideMenuUpdateService {    
    @Output() updateEvent = new EventEmitter();

    public updateSideMenuRequest() {
        this.updateEvent.emit("update");
    }
}