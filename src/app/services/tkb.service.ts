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

    solve(tongTiet: number) {
        return this.tkbEndpoint.solve(tongTiet);
    }

    getTkb(id: number) {
        return this.tkbEndpoint.getTkb(id);
    }

    getTkbLop(hieuLuc: string, id: number, lop: Lop) {
        return this.tkbEndpoint.getTkbLop(hieuLuc, id, lop);
    }

    getTkbGiaoVien(hieuLuc: string, id: number, giaoVien: GiaoVien) {
        return this.tkbEndpoint.getTkbGiaoVien(hieuLuc, id, giaoVien);
    }

    getLog(id: number) {
        return this.tkbEndpoint.getLog(id);
    }

    getLogLop(hieuLuc: string, id: number, lop: Lop) {
        return this.tkbEndpoint.getLogLop(hieuLuc, id, lop);
    }

    getLogGiaoVien(hieuLuc: string, id: number, giaoVien: GiaoVien) {
        return this.tkbEndpoint.getLogGiaoVien(hieuLuc, id, giaoVien);
    }

    /* saveAll(tableName: string, data: object[]) {
        return this.dataEndpoint.saveAll(tableName, data);
    } */
}
