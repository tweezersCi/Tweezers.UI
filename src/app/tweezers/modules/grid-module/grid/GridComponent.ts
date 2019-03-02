import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TweezersApi } from 'src/app/tweezers/utils/tweezers-api';
import { NavigationEnd, Router } from '@angular/router';
import { TweezersCache } from 'src/app/tweezers/utils/tweezers-cache';
import { Title } from '@angular/platform-browser';
import { BaseComponent } from '../../base-component/BaseComponent';

declare let window;

@Component({
    selector: 'tweezers-grid',
    templateUrl: "grid.component.html",
    styleUrls: ["grid.component.css"]
})
export class GridComponent extends BaseComponent{
    routerEventsSubscription: Subscription;

    valid: boolean;
    loading: boolean = false;

    entities: any;
    headers: any;
    fields: string[];
    displayedColumns: string[];
    idFieldName: string;
    refLink: string;
    gridName: string;
    iconName: string;

    constructor(protected tweezApi: TweezersApi, protected tweezCache: TweezersCache, protected router: Router,
        protected titleModule: Title) {
        super(tweezCache, tweezApi, router, titleModule);
        this.routerEventsSubscription = this.router.events.subscribe(ev => {
            if (ev instanceof NavigationEnd) {
                this.loading = true;
                this.loadGridData(ev.url);
            }
        });
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

    loadGridData(refLink: string): any {
        this.refLink = refLink;
        const entityMetadataPromise = this.tweezCache.getEntityMetadata(refLink).then((res) => {
            this.gridName = res.entityData.displayName;
            this.iconName = res.entityData.iconName;
            this.titleModule.setTitle(`${this.gridName} - Tweezers UI`);
            window.res = res;
            this.headers = {};
            if (res) {
                res.propertyData.forEach(pd => {
                    const name = pd.propertyName;
                    const displayName = pd.displayName;
                    this.headers[name] = displayName;
                    this.valid = true;
                });

                this.idFieldName = res.propertyData.find(pd => pd.idField).propertyName;
                this.valid = true;
            }
            else { 
                this.valid = false;
            }
            console.log("headers", this.headers);
            this.fields = Object.keys(this.headers);
            console.log("fields", this.fields);
            this.displayedColumns = this.fields.filter(f => f !== this.idFieldName);
        });

        const entitiesPromise = this.tweezApi.getEntities(refLink).then((res) => {
            this.entities = res;
            console.log("items", this.entities);
        });

        Promise.all([entitiesPromise, entityMetadataPromise]).then((res) => {
            this.loading = false;
        });
    }

    clickItem(item: any) {
        const itemLink = `${this.refLink}/${item[this.idFieldName]}`;
        console.log(itemLink);
        this.router.navigate([itemLink]);
    }
}