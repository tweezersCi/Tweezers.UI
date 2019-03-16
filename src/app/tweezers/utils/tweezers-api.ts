import { ClassBaseMetadata } from '../interfaces/class-base-metadata';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../../../tweezers-conf.json'
import { ClassMetadata } from '../interfaces/class-metadata';

declare let window: any;

@Injectable({
    providedIn: 'root'
})
export class TweezersApi {
    public baseUrl: string;

    constructor(private http: HttpClient) {
        window.tweezApi = this;
        this.baseUrl = config.url;
    }

    public getBaseLinkKey(refLink: string) {
        const parts = refLink.split('/').filter(el => el);
        const refLinkKey = parts.find(el => true);
        return refLinkKey;
    }

    public async discoverBaseEntities(): Promise<ClassBaseMetadata[]> {
        const discoverUrl = `${this.baseUrl}/api/tweezers`;
        return this.get(discoverUrl).then((res) => {
            return res.map(sr => sr as ClassBaseMetadata);
        });
    }

    public async getEntityMetadata(refLink: string): Promise<ClassMetadata> {
        const url = this.Sanitize(`${this.baseUrl}/api/tweezers/${refLink}`);
        return this.get(url);
    }

    public async getEntities(refLink: string): Promise<any> {
        const url = this.Sanitize(`${this.baseUrl}/api/${refLink}`);
        return this.get(url);
    }

    public async getEntity(refLink: string): Promise<any> {
        const url = this.Sanitize(`${this.baseUrl}/api/${refLink}`);
        return this.get(url);
    }

    public async saveEntity(itemUrl: string, item: any, isNew: boolean = false): Promise<any> {
        const url = isNew 
            ? this.Sanitize(`${this.baseUrl}/api/${this.getBaseLinkKey(itemUrl)}`)
            : this.Sanitize(`${this.baseUrl}/api/${itemUrl}`);
        return isNew ? this.post(url, item) : this.patch(url, item);
    }

    private async get(url: string): Promise<any> {
        return this.http.get(url).toPromise().then((res: any) => {
            if (res) {
                return res;
            }
        }).catch((err) => {
            // That's a bad error handling, but will do for now.
            console.log(err);
            return null;
        });
    }

    public async patch(url: string, body: any): Promise<any> {
        return this.http.patch(url, body, {headers: this.getHeaders()}).toPromise().then((res) => {
            if (res) {
                return res;
            }
        }).catch((err) => {
            // That's a bad error handling, but will do for now.
            console.log(err);
            return null;
        });
    }

    public async post(url: string, body: any): Promise<any> {
        return this.http.post(url, body, {headers: this.getHeaders()}).toPromise().then((res) => {
            if (res) {
                return res;
            }
        }).catch((err) => {
            // That's a bad error handling, but will do for now.
            console.log(err);
            return null;
        });
    }

    private Sanitize(url: string): string {
        return url.replace(/(https?:\/\/)|(\/){2,}/g, "$1$2")
    }

    private getHeaders() {
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        return headers;
    }
}
