import { NgxDatatableColumn } from "./ngx-datatable-column.model";

export class ColumnName {
    static LOP = [
        new NgxDatatableColumn("l", "Lớp"),
    ];
    static MONHOC = [
        new NgxDatatableColumn("mh", "Mã môn"),
        new NgxDatatableColumn("ten", "Tên môn"),
        new NgxDatatableColumn("cb", "Tiết liên tiếp"),
        new NgxDatatableColumn("lap", "Lần lặp/tuần"),
    ]
    static GIAOVIEN = [
        new NgxDatatableColumn("gv", "Mã giáo viên"),
        new NgxDatatableColumn("ho", "Họ giáo viên"),
        new NgxDatatableColumn("ten", "Tên giáo viên"),
        new NgxDatatableColumn("inf", "Thông tin"),
    ]
    static PHANCONG = [
        new NgxDatatableColumn("gv", "Mã giáo viên"),
        new NgxDatatableColumn("mh", "Mã môn học"),
        new NgxDatatableColumn("l", "Dạy lớp"),
    ]
    static DIEUKIEN = [
        ColumnName.PHANCONG[0],
        ColumnName.PHANCONG[1],
        ColumnName.PHANCONG[2],
        new NgxDatatableColumn("tiet", "Dạy tiết"),
        new NgxDatatableColumn("thu", "Thứ"),
    ]
    static TKB = [
        new NgxDatatableColumn("hieuLuc", "Thời gian hiệu lực"),
        new NgxDatatableColumn("id", "ID"),
        ColumnName[0],
        ColumnName[1],
        ColumnName[2],
        ColumnName[3],
        ColumnName[4],
    ]
}