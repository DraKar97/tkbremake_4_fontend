// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

import { Injectable } from '@angular/core';
import { DataEndpoint } from './data-endpoint.service';


@Injectable()
export class DataService {
    constructor(
        private dataEndpoint: DataEndpoint
    ) { }


    getAll(tableName: string) {
        return this.dataEndpoint.getAll(tableName);
    }

    saveAll(tableName: string, data: object[]) {
        return this.dataEndpoint.saveAll(tableName, data);
    }
}
