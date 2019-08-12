import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TweezersApi } from 'src/app/tweezers/utils/tweezers-api';
import { NavigationEnd, Router } from '@angular/router';
import { TweezersCache } from 'src/app/tweezers/utils/tweezers-cache';
import { Title } from '@angular/platform-browser';
import { BaseComponent } from '../../base-component/BaseComponent';
import * as _ from 'lodash';
import { TweezersButton } from 'src/app/tweezers/interfaces/tweezers-button';
import { AuthenticationService } from 'src/app/tweezers/utils/authentication-service';
import { MatSort } from '@angular/material/sort';

declare let window;

@Component({
    selector: 'tweezers-grid',
    templateUrl: "grid.component.html",
    styleUrls: ["grid.component.css"]
})
export class GridComponent extends BaseComponent implements AfterViewInit{
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

    entities: any[] = [];
    headers: any;
    propertyData: any;
    fields: string[] = [];
    displayedColumns: string[] = [];
    idFieldName: string;
    refLink: string;
    gridName: string;
    iconName: string;

    @ViewChild(MatSort, {static: false}) sort: MatSort;

    constructor(protected tweezApi: TweezersApi, protected tweezCache: TweezersCache, protected router: Router,
        protected titleModule: Title, protected authService: AuthenticationService) {
        super(tweezCache, tweezApi, router, titleModule, authService);
        this.routerEventsSubscription = this.router.events.subscribe(ev => {
            if (ev instanceof NavigationEnd) {
                this.refLink = ev.url;
                this.loadData();
            }
        });

        window.comp = this;
    }

    loadData(sortField: string = "", sortDirection: string = "asc") {
        this.loading = true;
        this.loadGridData(sortField, sortDirection);
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

    ngAfterViewInit(): void {
        this.sort.sortChange.subscribe(async () => {
            console.log("active: ", this.sort.active);
            console.log("direction: ", this.sort.direction);
            await this.loadData(this.sort.active, this.sort.direction);
        });
    }

    loadGridData(sortField: string = "", sortDirection: string = "asc"): any {
        const entityMetadataPromise = this.tweezCache.getEntityMetadata(this.refLink).then((res) => {
            console.log(res);
            window.grid = this;
            this.headers = {};
            this.propertyData = {};

            if (res) {
                this.gridName = res.displayNames.pluralName;
                this.iconName = res.icon;
                this.titleModule.setTitle(`${this.gridName} - Tweezers UI`);
                const keys = Object.keys(res.fields);
                console.log(keys);
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    const field = res.fields[key];
                    if (field.fieldProperties.gridIgnore)
                        continue;
                    
                    const name = field.fieldProperties.name;
                    const displayName = field.fieldProperties.displayName;
                    const type = field.fieldProperties.fieldType;
                    const values = field.fieldProperties.possibleValues;

                    this.propertyData[name] = {
                        displayName,
                        type,
                        values: _.invertBy(values)
                    };

                    this.idFieldName = "_id";
                    this.headers[name] = displayName;
                };
                
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

        const entitiesPromise = this.tweezApi.getEntities(`${this.refLink}?sortField=${sortField}&direction=${sortDirection}`).then((res) => {
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
        this.router.navigate([this.refLink, 'newItem'], {queryParams: {newItem: true}});
    }
}