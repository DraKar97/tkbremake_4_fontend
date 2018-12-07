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
import { timer } from 'rxjs';
import { DialogType, AlertService, MessageSeverity } from 'src/app/services/alert.service';


@Component({
    selector: 'giaoviens',
    templateUrl: './giaoviens.component.html',
    styleUrls: ['./giaoviens.component.css'],
    animations: [fadeInOut]
})
export class GiaoViensComponent {
    accessTable = "GIAOVIEN";
    pageName = "Danh sách giáo viên";
    icon = require("../../assets/images/table_b.png");

    isLoading: boolean;
    isSaving: boolean;

    rows: GiaoVien[] = [];
    rowsCache: GiaoVien[] = [];
    isCheckAll: boolean;

    constructor(
        private alertService: AlertService
        , private dataService: DataService
    ) { }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.isLoading = true;
        this.unCheckAll();
        this.clearSearch();
        this.rows = [];

        this.dataService.getAll(this.accessTable).subscribe(
            (res: GiaoVien[]) => {
                console.log(res);
                this.rows = res;
                for (var i = 0; i < this.rows.length; i++)
                    this.rows[i]["check"] = false;
                this.rowsCache = this.rows;
            }
            , null
            , () => {
                this.isLoading = false;
            }
        )
    }

    saveAll() {
        this.alertService.showDialog('Bạn có muốn lưu ' + this.pageName + '?'
            , DialogType.confirm
            , () => {
                this.isSaving = true;
                this.searchInput = "";
                this.rows = this.rowsCache;
                this.dataService.saveAll(this.accessTable, this.rows).subscribe(
                    (res) => console.log(res)
                    , null
                    , () => {
                        this.rowsCache = this.rows;
                        this.isSaving = false;
                    });
            });
    }
    deleteAllCheck() {
        var tmp: GiaoVien[] = [];
        for (var i = 0; i < this.rows.length; i++)
            if (!this.rows[i]["check"])
                tmp.push(this.rows[i]);
        this.rows = tmp;

        tmp = [];
        for (var i = 0; i < this.rowsCache.length; i++)
            if (!this.rowsCache[i]["check"])
                tmp.push(this.rowsCache[i]);
        this.rowsCache = tmp;
        this.unCheckAll();
    }
    onRestore() {
        this.unCheckAll();
        this.clearSearch();
        this.rows = BackupData[this.accessTable];
        for (var i = 0; i < this.rows.length; i++)
            this.rows[i]["check"] = false;
        this.rowsCache = this.rows;
    }

    checkAll() {
        this.isCheckAll = true;
        for (var i = 0; i < this.rows.length; i++)
            this.rows[i]["check"] = true;
    }
    unCheckAll() {
        this.isCheckAll = false;
    }
    clearSearch() {
        this.searchInput = "";
    }
    addRow() {
        this.unCheckAll();
        this.searchInput = "";
        this.rows = this.rowsCache;
        this.rows.push(new GiaoVien());
        const rows = document.getElementsByTagName("tbody")[0].rows;
        timer(100).subscribe(
            () => rows[rows.length - 2].children[1].getElementsByTagName("input")[0].focus()
        )
    }

    focusNextRow() {
        document.activeElement
            .parentElement.parentElement //curRow
            .nextElementSibling          //nextRow
            .children[1].getElementsByTagName("input")[0].focus();
    }

    ngOnDestroy() {
        this.saveAll();
    }

    get searchInput() {
        return document.getElementsByTagName("search-box")[0]
            .firstElementChild
            .getElementsByTagName("input")[0].value;
    }

    set searchInput(value: string) {
        document.getElementsByTagName("search-box")[0]
            .firstElementChild
            .getElementsByTagName("input")[0].value = value;
    }

    onSearchChanged(value: string) {
        this.rows = this.rowsCache.filter((r: GiaoVien) => Utilities.searchArray(value, false, r.gv, r.ho, r.ten, r.inf));
    }
}
