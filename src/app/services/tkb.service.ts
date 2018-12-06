// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

import { Injectable } from '@angular/core';
import { TkbEndpoint } from './tkb-endpoint.service';
import { Lop } from '../models/lop.model';
import { GiaoVien } from '../models/giao-vien.model';


@Injectable()
export class TkbService {
    constructor(
        private tkbEndpoint: TkbEndpoint
    ) { }


    getTkb(hieuLuc: Date, id: number) {
        return this.tkbEndpoint.getTkb(hieuLuc, id);
    }

    getTkbLop(hieuLuc: Date, id: number, lop: Lop) {
        return this.tkbEndpoint.getTkbLop(hieuLuc, id, lop);
    }

    getTkbGiaoVien(hieuLuc: Date, id: number, giaoVien: GiaoVien) {
        return this.tkbEndpoint.getTkbGiaoVien(hieuLuc, id, giaoVien);
    }

    getLog(hieuLuc: Date, id: number) {
        return this.tkbEndpoint.getLog(hieuLuc, id);
    }

    getLogLop(hieuLuc: Date, id: number, lop: Lop) {
        return this.tkbEndpoint.getLogLop(hieuLuc, id, lop);
    }

    getLogGiaoVien(hieuLuc: Date, id: number, giaoVien: GiaoVien) {
        return this.tkbEndpoint.getLogGiaoVien(hieuLuc, id, giaoVien);
    }

    /* saveAll(tableName: string, data: object[]) {
        return this.dataEndpoint.saveAll(tableName, data);
    } */
}
