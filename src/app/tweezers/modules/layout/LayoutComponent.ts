import { Component, ViewChild, ElementRef } from '@angular/core';
import { BaseComponent } from '../base-component/BaseComponent';
import { MatDrawer, MatToolbar } from '@angular/material';

declare let window;

@Component({
    selector   : 'layout',
    templateUrl: 'layout.html',
    styleUrls  : [ 'layout.css' ]
})
export class LayoutComponent extends BaseComponent {
    title: string;
    
    ngOnInit(): void {
        window.layout = this;

        this.tweezCache.getGeneralMetadata().then(res => {
            this.title = res.Title;
            this.titleModule.setTitle(`${this.title} - Tweezers`);
        });
    }

    ngAfterViewInit(): void {
    }
}