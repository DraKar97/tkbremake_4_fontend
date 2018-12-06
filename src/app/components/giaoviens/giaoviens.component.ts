// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

import { Component, Input } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { Utilities } from 'src/app/services/utilities';
import { BackupData } from 'src/app/models/backup-data';
import { ColumnName } from 'src/app/models/column-name';
import { DataService } from 'src/app/services/data.service';
import { GiaoVien } from 'src/app/models/giao-vien.model';


@Component({
    selector: 'giaoviens',
    templateUrl: './giaoviens.component.html',
    styleUrls: ['./giaoviens.component.css'],
    animations: [fadeInOut]
})
export class GiaoViensComponent {
    accessTable = "GIAOVIEN";
    icon = require("../../assets/images/table_b.png")

    rows = [];
    rowsCache = [];
    columns = [];
    loadingIndicator: boolean = true;

    @Input()
    verticalScrollbar: boolean = false;

    constructor(
        private dataService: DataService
    ) { }

    ngOnInit() {
        this.loadingIndicator = true;
        this.columns = ColumnName[this.accessTable];

        this.dataService.saveAll(this.accessTable, BackupData[this.accessTable]).subscribe(
            (res) => console.log(res)
            , null
            , () => this.getData()
        )
    }

    getData() {
        this.dataService.getAll(this.accessTable).subscribe(
            (res: GiaoVien[]) => {
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
        this.rows = this.rowsCache.filter((r: GiaoVien) => Utilities.searchArray(value, false, r.gv, r.ho, r.ten, r.inf));
    }
}
