export interface AppDetails {
    title: string;
    initialUsername: string;
    initialPassword: string;
    canChangeSchema: boolean;
}

export interface DBDetails {
    dbType: string;
    dbName: string;
    host: string;
    port: number;
    username: string;
    password: string;
}

export interface InitialDetails {
    dbDetails: DBDetails;
    appDetails: AppDetails;
}
