import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../../../tweezers-conf.json'
import { Router } from '@angular/router';

declare let window: any;

@Injectable({
    providedIn: 'root'
})
export class TweezersApi {
    public baseUrl: string;
    
    constructor(private http: HttpClient, private router: Router) {
        window.tweezApi = this;
        this.baseUrl = config.url;
    }

    public getBaseLinkKey(refLink: string) {
        const parts = refLink.split('/').filter(el => el);
        const refLinkKey = parts.find(el => true);
        return refLinkKey;
    }

    public async discoverBaseEntities(): Promise<any> {
        const discoverUrl = `${this.baseUrl}/api/tweezers-schema?internalObj=true`;
        return this.get(discoverUrl).then((res) => {
            return res.items.map(obj => {
                obj.referenceLink = `/${obj.collectionName}`;
                return obj;
            });
        });
    }

    public async getGeneralMetadata(): Promise<any> {
        const url = this.Sanitize(`${this.baseUrl}/api/metadata`);
        return this.get(url);
    }

    public async getEntityMetadata(refLink: string): Promise<any> {
        const url = this.Sanitize(`${this.baseUrl}/api/tweezers-schema/${refLink}?internalObj=true`);
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

    public async deleteEntity(itemUrl: string): Promise<any> {
        const url = this.Sanitize(`${this.baseUrl}/api/${itemUrl}`);
        return this.delete(url);
    }

    public async login(username: string, password: string) {
        const loginRequest = {
            username,
            password
        };

        const url = this.Sanitize(`${this.baseUrl}/api/login`);
        return this.post(url, loginRequest);
    }

    private async get(url: string): Promise<any> {
        return this.http.get(url, {headers: this.getHeaders()}).toPromise().then((res: any) => {
            if (res) {
                return res;
            }
        }).catch((err) => {
            return this.handleErrors(err);
        });
    }

    public async patch(url: string, body: any): Promise<any> {
        return this.http.patch(url, body, {headers: this.getHeaders()}).toPromise().then((res) => {
            if (res) {
                return res;
            }
        }).catch((err) => {
            return this.handleErrors(err);
        });
    }

    public async post(url: string, body: any): Promise<any> {
        return this.http.post(url, body, {headers: this.getHeaders()}).toPromise().then((res) => {
            if (res) {
                return res;
            }
        }).catch((err) => {
            return this.handleErrors(err);
        });
    }

    public async delete(url: string, opts?: any): Promise<any> {
        return this.http.delete(url, {headers: this.getHeaders()}).toPromise().then((res) => {
            if (res) {
                return res;
            }
        }).catch((err) => {
            return this.handleErrors(err);
        });
    }

    private handleErrors(err: HttpErrorResponse) {
        console.log(err);
        if (err.status == 401) {
            localStorage.clear();
            this.router.navigate(['']);
        }
        return Promise.reject();
    }

    private Sanitize(url: string): string {
        return url.replace(/(https?:\/\/)|(\/){2,}/g, "$1$2")
    }

    private getHeaders() {
        const sessionId = localStorage.getItem('sessionId') || '';
        let headers = new HttpHeaders()
            .append('Accept', 'application/json')
            .append('Content-Type', 'application/json')
            .append('sessionId', sessionId);

        console.log(headers);
        return headers;
    }
}
