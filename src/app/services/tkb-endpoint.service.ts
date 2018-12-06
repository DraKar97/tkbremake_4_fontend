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
import { Lop } from '../models/lop.model';
import { GiaoVien } from '../models/giao-vien.model';


@Injectable()
export class TkbEndpoint extends EndpointFactory {

    private readonly _tkbUrl: string = '/api/schedule/get';
    private readonly _logUrl: string = '/api/log/get';
    //private readonly _saveUrl: string = '/api/table/save';

    get tkbUrl() { return this.configurations.baseUrl + this._tkbUrl; }
    get logUrl() { return this.configurations.baseUrl + this._logUrl; }
    //get saveUrl() { return this.configurations.baseUrl + this._saveUrl; }

    constructor(
        http: HttpClient
        , configurations: ConfigurationService
        , injector: Injector
    ) {
        super(http, configurations, injector);
    }

    getTkb<T>(hieuLuc: Date, id: number): Observable<T> {
        let endpointUrl = `${this.tkbUrl}/Schedule?HieuLuc=${hieuLuc}&Id=${id}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
            catchError(error => {
                return this.handleError(error, () => this.getTkb<T>(hieuLuc, id));
            }));
    }

    getTkbLop<T>(hieuLuc: Date, id: number, lop: Lop): Observable<T> {
        let endpointUrl = `${this.tkbUrl}/ClassSchedule?HieuLuc=${hieuLuc}&Id=${id}&Lop=${lop.l}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
            catchError(error => {
                return this.handleError(error, () => this.getTkb<T>(hieuLuc, id));
            }));
    }

    getTkbGiaoVien<T>(hieuLuc: Date, id: number, giaoVien: GiaoVien): Observable<T> {
        let endpointUrl = `${this.tkbUrl}/ClassSchedule?HieuLuc=${hieuLuc}&Id=${id}&Lop=${giaoVien.gv}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
            catchError(error => {
                return this.handleError(error, () => this.getTkb<T>(hieuLuc, id));
            }));
    }

    getLog<T>(hieuLuc: Date, id: number): Observable<T> {
        let endpointUrl = `${this.logUrl}/LOG?HieuLuc=${hieuLuc}&Id=${id}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
            catchError(error => {
                return this.handleError(error, () => this.getTkb<T>(hieuLuc, id));
            }));
    }

    getLogLop<T>(hieuLuc: Date, id: number, lop: Lop): Observable<T> {
        let endpointUrl = `${this.logUrl}/LOGLOP?HieuLuc=${hieuLuc}&Id=${id}&Lop=${lop.l}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
            catchError(error => {
                return this.handleError(error, () => this.getTkb<T>(hieuLuc, id));
            }));
    }

    getLogGiaoVien<T>(hieuLuc: Date, id: number, giaoVien: GiaoVien): Observable<T> {
        let endpointUrl = `${this.logUrl}/LOGGV?HieuLuc=${hieuLuc}&Id=${id}&Lop=${giaoVien.gv}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
            catchError(error => {
                return this.handleError(error, () => this.getTkb<T>(hieuLuc, id));
            }));
    }

    /* saveAll<T>(tableName: string, data: object[]): Observable<T> {
        let endpointUrl = `${this.saveUrl}/${tableName}`;

        return this.http.post<T>(endpointUrl, data, this.getRequestHeaders()).pipe<T>(
            catchError(error => {
                return this.handleError(error, () => this.saveAll<T>(tableName, data));
            }));
    } */
}
