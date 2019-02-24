import { ClassBaseMetadata } from '../interfaces/class-base-metadata';
import { HttpClient } from '@angular/common/http';
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

    private async get(url): Promise<any> {
        return this.http.get(url).toPromise().then((res: any) => {
            if (res) {
                return res;
            }
        }).catch((err) => {
            // That's a bad error handling, but will do for now.
            return null;
        });
    }

    private Sanitize(url: string): string {
        return url.replace(/(https?:\/\/)|(\/){2,}/g, "$1$2")
    }
}
