// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

import { Component, Input } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { Utilities } from 'src/app/services/utilities';
import { TKB } from 'src/app/models/tkb.model';
import { TkbService } from 'src/app/services/tkb.service';
import { DataService } from 'src/app/services/data.service';
import { Lop } from 'src/app/models/lop.model';
import { formatDate } from '@angular/common';
import { MessageSeverity, DialogType, AlertService } from 'src/app/services/alert.service';
import { timer } from 'rxjs';


@Component({
    selector: 'tkbs',
    templateUrl: './tkbs.component.html',
    styleUrls: ['./tkbs.component.css'],
    animations: [fadeInOut]
})
export class TkbsComponent {
    accessTable = "LOP";
    icon = require("../../assets/images/view_b.png");
    alert = require("../../assets/images/alert.png");

    tongTiet: number;
    lops: Lop[] = [];
    tkbs: TKB[] = [];
    logs: TKB[] = [];
    tkb: any[] = [];

    isSolving: boolean;
    isLoading: boolean;
    pageName: string;

    constructor(
        private dataService: DataService
        , private tkbService: TkbService
        , private alertService: AlertService
    ) {
        for (var i = 2; i <= 8; i++) {
            this.tkb[i] = [];
            for (var j = 1; j <= 5; j++)
                this.tkb[i][j] = [];
        }
    }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.getAllLop();
        this.getLog();
    }

    getAllLop() {
        this.dataService.getAll(this.accessTable).subscribe(
            (res: Lop[]) => this.lops = res
            , null
            , () => this.getTKB()
        )
    }

    getTKB() {
        this.tkbService.getTkb(1).subscribe(
            (res: TKB[]) => this.tkbs = res
            , null
            , () => this.transDataToUI()
        )
    }

    transDataToUI() {
        for (var i = 2; i <= 8; i++) {
            this.tkb[i] = [];
            for (var j = 1; j <= 5; j++)
                this.tkb[i][j] = [];
        }
        for (var i = 0; i < this.tkbs.length; i++)
            this.tkb[this.tkbs[i].thu][this.tkbs[i].tiet][this.findL(this.tkbs[i].l, this.lops)] = this.tkbs[i].mh + " " + this.tkbs[i].gv;
    }

    getLog() {
        this.tkbService.getLog(1).subscribe(
            (res: TKB[]) => this.logs = res
        )
    }

    findL(l: string, lops: Lop[]) {
        var i: number;
        for (var i = 0; i < this.lops.length; i++)
            if (l == lops[i].l)
                return i;
        return null;
    }

    solve() {
        timer(100).subscribe(() => {
            this.alertService.showDialog('Bạn có muốn xóa TKB hiện tại để tạo TKB mới?<br/>Nhập "OK" để tiếp tục'
                , DialogType.prompt
                , (val) => {
                    if (val != "OK") return;
                    this.isSolving = true;
                    var _res: boolean;
                    this.tkbService.solve(this.tongTiet).subscribe(
                        (res: boolean) => _res = res
                        , () => this.isSolving = false
                        , () => {
                            this.getTKB();
                            this.isSolving = _res ? false : true
                        }

                    )
                })
        })
    }
}
