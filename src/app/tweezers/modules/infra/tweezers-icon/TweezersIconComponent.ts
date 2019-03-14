import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../base-component/BaseComponent';

@Component({
    selector: 'tweezers-icon',
    templateUrl: 'tweezers-icon.component.html',
    styleUrls: ['tweezers-icon.component.css'],
})
export class TweezersIconComponent extends BaseComponent {
    @Input() name: string;
    isSvg: boolean = false;
     
    ngAfterContentInit(): void {
        //Called after ngOnInit when the component's or directive's content has been initialized.
        //Add 'implements AfterContentInit' to the class.
    }
}