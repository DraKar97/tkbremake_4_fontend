// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

import { Component, ViewChild, TemplateRef, Input } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { TodoDemoComponent } from '../controls/todo-demo.component';
import { DialogType, MessageSeverity, AlertService } from 'src/app/services/alert.service';
import { Utilities } from 'src/app/services/utilities';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppTranslationService } from 'src/app/services/app-translation.service';
import { LocalStoreManager } from 'src/app/services/local-store-manager.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'lops',
    templateUrl: './lops.component.html',
    styleUrls: ['./lops.component.css'],
    animations: [fadeInOut]
})
export class LopsComponent {
    icon = require("../../assets/images/table_b.png")
    public static readonly DBKeyTodoDemo = "todo-demo.todo_list";

    rows = [];
    rowsCache = [];
    columns = [];
    editing = {};
    taskEdit = {};
    isDataLoaded: boolean = false;
    loadingIndicator: boolean = true;
    formResetToggle: boolean = true;
    _currentUserId: string;
    _hideCompletedTasks: boolean = false;


    get currentUserId() {
        if (this.authService.currentUser)
            this._currentUserId = this.authService.currentUser.id;

        return this._currentUserId;
    }

    @Input()
    verticalScrollbar: boolean = false;


    @ViewChild('statusHeaderTemplate')
    statusHeaderTemplate: TemplateRef<any>;

    @ViewChild('statusTemplate')
    statusTemplate: TemplateRef<any>;

    @ViewChild('nameTemplate')
    nameTemplate: TemplateRef<any>;

    @ViewChild('descriptionTemplate')
    descriptionTemplate: TemplateRef<any>;

    @ViewChild('actionsTemplate')
    actionsTemplate: TemplateRef<any>;

    @ViewChild('editorModal')
    editorModal: ModalDirective;


    constructor(
        private alertService: AlertService
        , private translationService: AppTranslationService
        , private localStorage: LocalStoreManager
        , private authService: AuthService
        , private http: HttpClient
    ) {
    }



    ngOnInit() {
        this.loadingIndicator = true;
        let gT = (key: string) => this.translationService.getTranslation(key);
        this.columns = [
            { prop: "l", name: 'Lớp' },
        ];

        const saveLopUrl = "/api/Table/save/LOP";
        const saveData = [{ L: "1.1" }, { L: "1.2" }];
        this.http.post(environment.baseUrl + saveLopUrl, saveData)
            .subscribe((res) => console.log(res)
                , null
                , () => {
                    const getLopUrl = "/api/Table/get/LOP";
                    this.http.get(environment.baseUrl + getLopUrl)
                        .subscribe((res: [{ l: string }]) => {
                            console.log(res);
                            this.rows = res;
                            this.rowsCache = this.rows;
                            this.loadingIndicator = false;
                        });
                });
    }

    ngOnDestroy() {

    }

    refreshDataIndexes(data) {
        let index = 0;

        for (let i of data) {
            i.$$index = index++;
        }
    }


    onSearchChanged(value: string) {
        this.rows = this.rowsCache.filter(r => Utilities.searchArray(value, false, r.l));
    }


    showErrorAlert(caption: string, message: string) {
        this.alertService.showMessage(caption, message, MessageSeverity.error);
    }


    addTask() {
        this.formResetToggle = false;

        setTimeout(() => {
            this.formResetToggle = true;

            this.taskEdit = {};
            this.editorModal.show();
        });
    }

    save() {
        this.rowsCache.splice(0, 0, this.taskEdit);
        this.rows.splice(0, 0, this.taskEdit);
        this.refreshDataIndexes(this.rowsCache);
        this.rows = [...this.rows];

        this.saveToDisk();
        this.editorModal.hide();
    }


    updateValue(event, cell, cellValue, row) {
        this.editing[row.$$index + '-' + cell] = false;
        this.rows[row.$$index][cell] = event.target.value;
        this.rows = [...this.rows];

        this.saveToDisk();
    }


    delete(row) {
        this.alertService.showDialog('Are you sure you want to delete the task?', DialogType.confirm, () => this.deleteHelper(row));
    }


    deleteHelper(row) {
        this.rowsCache = this.rowsCache.filter(item => item !== row)
        this.rows = this.rows.filter(item => item !== row)

        this.saveToDisk();
    }


    saveToDisk() {
        if (this.isDataLoaded)
            this.localStorage.saveSyncedSessionData(this.rowsCache, `${TodoDemoComponent.DBKeyTodoDemo}:${this.currentUserId}`);
    }
}
