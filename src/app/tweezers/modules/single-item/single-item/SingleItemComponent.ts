import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TweezersApi } from 'src/app/tweezers/utils/tweezers-api';
import { TweezersCache } from 'src/app/tweezers/utils/tweezers-cache';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BaseComponent } from '../../base-component/BaseComponent';

declare let window;

@Component({
    selector: 'tweezers-single-item',
    templateUrl: "single-item.component.html",
    styleUrls: ["single-item.component.css"],
})
export class SingleItemComponent extends BaseComponent {
    loading: boolean;
    item: any;
    routerEventsSubscription: Subscription;
    headers: any;
    fields: string[];

    constructor(protected tweezApi: TweezersApi, protected tweezCache: TweezersCache, protected router: Router,
        protected titleModule: Title) {
        super(tweezCache, tweezApi, router, titleModule);
        this.routerEventsSubscription = this.router.events.subscribe(ev => {
            if (ev instanceof NavigationEnd) {
                this.loading = true;
                this.loadData(ev.url);
            }
        });
        window.component = this;
    }


    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.

    }

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.routerEventsSubscription.unsubscribe();
    }

    loadData(url: string): any {
        const entityPromise = this.tweezApi.getEntity(url).then((res) => {
            if (res) {
                this.item = res;
                window.item = this.item;
                this.titleModule.setTitle(`${this.item.name} - Tweezers UI`);
                console.log("current item", this.item);
            }
        });

        const metadataPromise = this.tweezCache.getEntityMetadata(url).then(res => {
            this.headers = {};
            if (res) {
                res.propertyData.forEach(pd => {
                    const name = pd.propertyName;
                    const displayName = pd.displayName;
                    this.headers[name] = displayName;
                });
            }
            this.fields = Object.keys(this.headers);
            console.log("headers", this.headers);
            console.log("fields", this.fields);
        });

        Promise.all([entityPromise, metadataPromise]).then((res) => {
            this.loading = false;
        });
    }
}