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

    private readonly _solveUrl: string = '/api/admin/solve';
    private readonly _tkbUrl: string = '/api/schedule/get';
    private readonly _logUrl: string = '/api/log/get';
    //private readonly _saveUrl: string = '/api/table/save';

    get solveUrl() { return this.configurations.baseUrl + this._solveUrl; }
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

    solve<T>(tongTiet: number): Observable<T> {
        let endpointUrl = `${this.solveUrl}?tongtiet=${tongTiet}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
            catchError(error => {
                return this.handleError(error, () => this.solve<T>(tongTiet));
            }));
    }

    getTkb<T>(id: number): Observable<T> {
        let endpointUrl = `${this.tkbUrl}/Schedule?Id=${id}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
            catchError(error => {
                return this.handleError(error, () => this.getTkb<T>(id));
            }));
    }

    getTkbLop<T>(hieuLuc: string, id: number, lop: Lop): Observable<T> {
        let endpointUrl = `${this.tkbUrl}/ClassSchedule?HieuLuc=${hieuLuc}&Id=${id}&Lop=${lop.l}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
            catchError(error => {
                return this.handleError(error, () => this.getTkbLop<T>(hieuLuc, id, lop));
            }));
    }

    getTkbGiaoVien<T>(hieuLuc: string, id: number, giaoVien: GiaoVien): Observable<T> {
        let endpointUrl = `${this.tkbUrl}/ClassSchedule?HieuLuc=${hieuLuc}&Id=${id}&Lop=${giaoVien.gv}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
            catchError(error => {
                return this.handleError(error, () => this.getTkbGiaoVien<T>(hieuLuc, id, giaoVien));
            }));
    }

    getLog<T>(id: number): Observable<T> {
        let endpointUrl = `${this.logUrl}/LOG?Id=${id}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
            catchError(error => {
                return this.handleError(error, () => this.getLog<T>(id));
            }));
    }

    getLogLop<T>(hieuLuc: string, id: number, lop: Lop): Observable<T> {
        let endpointUrl = `${this.logUrl}/LOGLOP?HieuLuc=${hieuLuc}&Id=${id}&Lop=${lop.l}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
            catchError(error => {
                return this.handleError(error, () => this.getLogLop<T>(hieuLuc, id, lop));
            }));
    }

    getLogGiaoVien<T>(hieuLuc: string, id: number, giaoVien: GiaoVien): Observable<T> {
        let endpointUrl = `${this.logUrl}/LOGGV?HieuLuc=${hieuLuc}&Id=${id}&Lop=${giaoVien.gv}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
            catchError(error => {
                return this.handleError(error, () => this.getLogGiaoVien<T>(hieuLuc, id, giaoVien));
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
