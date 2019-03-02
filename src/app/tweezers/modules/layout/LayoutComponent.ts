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
    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.titleModule.setTitle("Tweezers");
        window.layout = this;
    }

    ngAfterViewInit(): void {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
    }
}