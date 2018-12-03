// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { CustomersComponent } from "./components/customers/customers.component";
import { ProductsComponent } from "./components/products/products.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { AboutComponent } from "./components/about/about.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { LopsComponent } from './components/lops/lops.component';


const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard], data: { title: "Home" } },
  { path: "login", component: LoginComponent, data: { title: "Login" } },
  { path: "customers", component: CustomersComponent, canActivate: [AuthGuard], data: { title: "Customers" } },
  { path: "products", component: ProductsComponent, canActivate: [AuthGuard], data: { title: "Products" } },
  { path: "orders", component: OrdersComponent, canActivate: [AuthGuard], data: { title: "Orders" } },
  { path: "settings", component: SettingsComponent, canActivate: [AuthGuard], data: { title: "Settings" } },
  { path: "about", component: AboutComponent, data: { title: "About Us" } },
  { path: "home", redirectTo: "/", pathMatch: "full" },
  { path: "table/lops", component: LopsComponent, canActivate: [AuthGuard], data: { title: "Lớp" } },
  { path: "table/monhocs", component: LopsComponent, canActivate: [AuthGuard], data: { title: "Môn học" } },
  { path: "table/giaoviens", component: LopsComponent, canActivate: [AuthGuard], data: { title: "Giáo viên" } },
  { path: "table/phancongs", component: LopsComponent, canActivate: [AuthGuard], data: { title: "Phân công" } },
  { path: "table/dieukiens", component: LopsComponent, canActivate: [AuthGuard], data: { title: "Điều kiện" } },
  { path: "**", component: NotFoundComponent, data: { title: "Page Not Found" } }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard]
})
export class AppRoutingModule { }