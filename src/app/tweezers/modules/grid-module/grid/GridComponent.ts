import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TweezersApi } from 'src/app/tweezers/utils/tweezers-api';
import { NavigationEnd, Router } from '@angular/router';
import { TweezersCache } from 'src/app/tweezers/utils/tweezers-cache';
import { Title } from '@angular/platform-browser';
import { BaseComponent } from '../../base-component/BaseComponent';
import * as _ from 'lodash';
import { TweezersButton } from 'src/app/tweezers/interfaces/tweezers-button';

declare let window;

@Component({
    selector: 'tweezers-grid',
    templateUrl: "grid.component.html",
    styleUrls: ["grid.component.css"]
})
export class GridComponent extends BaseComponent{
    routerEventsSubscription: Subscription;
    buttons: TweezersButton[] = [
        {
            label: "Add",
            icon: "add",
            clickFunction: this.onAddItemClicked.bind(this),
        }
    ];
    
    valid: boolean;
    loading: boolean = false;

    entities: any;
    headers: any;
    propertyData: any;
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
            console.log(res);
            window.grid = this;
            this.headers = {};
            this.propertyData = {};

            if (res) {
                this.gridName = res.displayNames.pluralName;
                this.iconName = res.icon;
                this.titleModule.setTitle(`${this.gridName} - Tweezers UI`);
                const keys = Object.keys(res.fields);
                keys.forEach(key => {
                    const field = res.fields[key];
                    console.log("field", field);
                    const name = field.name;
                    const displayName = field.displayName;
                    const type = field.fieldProperties.fieldType;
                    const values = field.fieldProperties.possibleValues;

                    this.propertyData[name] = {
                        displayName,
                        type,
                        values: _.invertBy(values)
                    };

                    this.idFieldName = "_id";
                    this.headers[name] = displayName;
                });
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
            this.entities = res.items;
            console.log("items", this.entities);
        });

        Promise.all([entitiesPromise, entityMetadataPromise]).then((res) => {
            this.loading = false;
        });
    }

    clickItem(item: any) {
        this.router.navigate([this.refLink, item[this.idFieldName]]);
    }

    stringify(item: any, field: string) {
        return item[field];
    }

    onAddItemClicked() {
        this.router.navigate([this.refLink, 'newItem'], {queryParams: {newItem: true}})
    }
}