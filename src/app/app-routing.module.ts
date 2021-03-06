// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { AboutComponent } from "./components/about/about.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';

import { HoatDongsComponent } from './components/hoatdongs/hoatdongs.component';

import { LopsComponent } from './components/lops/lops.component';
import { MonHocsComponent } from './components/monhocs/monhocs.component';
import { GiaoViensComponent } from './components/giaoviens/giaoviens.component';
import { PhanCongsComponent } from './components/phancongs/phancongs.component';
import { DieuKiensComponent } from './components/dieukiens/dieukiens.component';

import { TkbsComponent } from './components/tkbs/tkbs.component';


const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard], data: { title: "Home" } },
  { path: "login", component: LoginComponent, data: { title: "Login" } },
  { path: "hoatdongs", component: HoatDongsComponent, canActivate: [AuthGuard], data: { title: "Hoạt động" } },
  { path: "settings", component: SettingsComponent, canActivate: [AuthGuard], data: { title: "Settings" } },
  { path: "about", component: AboutComponent, data: { title: "About Us" } },
  { path: "home", redirectTo: "/", pathMatch: "full" },

  { path: "table/lops", component: LopsComponent, canActivate: [AuthGuard], data: { title: "Lớp" } },
  { path: "table/monhocs", component: MonHocsComponent, canActivate: [AuthGuard], data: { title: "Môn học" } },
  { path: "table/giaoviens", component: GiaoViensComponent, canActivate: [AuthGuard], data: { title: "Giáo viên" } },
  { path: "table/phancongs", component: PhanCongsComponent, canActivate: [AuthGuard], data: { title: "Phân công" } },
  { path: "table/dieukiens", component: DieuKiensComponent, canActivate: [AuthGuard], data: { title: "Điều kiện" } },

  { path: "tkb/tkb", component: TkbsComponent, canActivate: [AuthGuard], data: { title: "Thời khóa biểu" } },
  { path: "tkb/lop", component: TkbsComponent, canActivate: [AuthGuard], data: { title: "TKB Lớp" } },
  { path: "tkb/giaovien", component: TkbsComponent, canActivate: [AuthGuard], data: { title: "TKB Giáo viên" } },

  { path: "**", component: NotFoundComponent, data: { title: "Page Not Found" } }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard]
})
export class AppRoutingModule { }
