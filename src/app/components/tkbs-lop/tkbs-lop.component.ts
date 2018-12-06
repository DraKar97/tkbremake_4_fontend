// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

import { Component, Input } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { Utilities } from 'src/app/services/utilities';
import { BackupData } from 'src/app/models/backup-data';
import { ColumnName } from 'src/app/models/column-name';
import { TKB } from 'src/app/models/tkb.model';
import { TkbService } from 'src/app/services/tkb.service';
import { DataService } from 'src/app/services/data.service';
import { Lop } from 'src/app/models/lop.model';
import { formatDate } from '@angular/common';


@Component({
    selector: 'tkbs-lop',
    templateUrl: './tkbs-lop.component.html',
    styleUrls: ['./tkbs-lop.component.css'],
    animations: [fadeInOut]
})
export class TkbsLopComponent {
    accessTable = "LOP";
    icon = require("../../assets/images/view_b.png")

    rows = [];
    rowsCache = [];
    columns = [];
    loadingIndicator: boolean = true;

    @Input()
    verticalScrollbar: boolean = false;

    constructor(
        private dataService: DataService
        , private tkbService: TkbService
    ) { }

    ngOnInit() {
        this.loadingIndicator = true;

        this.getAllLop();
        const now = formatDate(Date.now(), 'yyyyMMdd', 'en');
        this.tkbService.getTkbLop(new Date(), 1, { l: '1.3' }).subscribe(
            (res: TKB[]) => console.log(res)
        )
        this.tkbService.getLogLop(new Date(), 1, { l: '1.3' }).subscribe(
            (res: TKB[]) => console.log(res)
        )
    }

    getAllLop() {
        this.dataService.getAll(this.accessTable).subscribe(
            (res: Lop[]) => {
                console.log(res);
                this.rows = res;
                this.rowsCache = this.rows;
                this.loadingIndicator = false;
            }
        )
    }

    ngOnDestroy() {

    }

    onSearchChanged(value: string) {
        this.rows = this.rowsCache.filter((r: Lop) => Utilities.searchArray(value, false, r.l));
    }
}
