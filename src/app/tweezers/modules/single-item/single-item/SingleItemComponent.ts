import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TweezersApi } from 'src/app/tweezers/utils/tweezers-api';
import { TweezersCache } from 'src/app/tweezers/utils/tweezers-cache';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BaseComponent } from '../../base-component/BaseComponent';
import { TweezersButton } from 'src/app/tweezers/interfaces/tweezers-button';

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
    propertyData: any;
    entityData: any;
    fields: string[];
    buttons: TweezersButton[] = [
        {
            label: "Save",
            icon: "save",
            clickFunction: () => { /* TODO */ }
        }
    ];

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
                this.titleModule.setTitle(`${this.item.name} - Tweezers UI`);
            }
        });

        const metadataPromise = this.tweezCache.getEntityMetadata(url).then(res => {
            this.propertyData = {};
            this.entityData = {
                displayName: res.entityData.displayName,
                iconName: res.entityData.iconName,
                refLink: `/${this.tweezCache.getBaseLinkKey(this.router.url)}`
            };
            
            if (res) {
                res.propertyData.forEach(pd => {
                    const name = pd.propertyName;
                    const displayName = pd.displayName;
                    const type = pd.propertyType;
                    const values = pd.values;
                    
                    if (pd.idField)
                        this.entityData['idField'] = name;

                    this.propertyData[name] = {
                        displayName,
                        type,
                        values
                    };
                });
            }
            this.fields = Object.keys(this.propertyData).filter(k => k !== this.entityData.idField);
        });

        Promise.all([entityPromise, metadataPromise]).then((res) => {
            window.item = this.item;
            window.component = this;
            this.loading = false;
        });
    }

    navigateToFather() {
        this.router.navigate([this.entityData.refLink]);
    }
}