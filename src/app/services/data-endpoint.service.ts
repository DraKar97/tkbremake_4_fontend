// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';


@Injectable()
export class DataEndpoint extends EndpointFactory {

    private readonly _dataUrl: string = '/api/table/get';
    private readonly _saveUrl: string = '/api/table/save';

    get dataUrl() { return this.configurations.baseUrl + this._dataUrl; }
    get saveUrl() { return this.configurations.baseUrl + this._saveUrl; }

    constructor(
        http: HttpClient
        , configurations: ConfigurationService
        , injector: Injector
    ) {
        super(http, configurations, injector);
    }

    getAll<T>(tableName: string): Observable<T> {
        let endpointUrl = `${this.dataUrl}/${tableName}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
            catchError(error => {
                return this.handleError(error, () => this.getAll<T>(tableName));
            }));
    }

    saveAll<T>(tableName: string, data: object[]): Observable<T> {
        let endpointUrl = `${this.saveUrl}/${tableName}`;

        return this.http.post<T>(endpointUrl, data, this.getRequestHeaders()).pipe<T>(
            catchError(error => {
                return this.handleError(error, () => this.saveAll<T>(tableName, data));
            }));
    }
}
