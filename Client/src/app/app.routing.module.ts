import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component'
import { ProfileComponent } from './components/profile/profile.component'
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards//notAuth.guard';
import { BlogComponent } from './components/blog/blog.component'
import {AdminComponent} from './components/admin/admin.component'
import {ViewProfileComponent}from './components/view-profile/view-profile.component'
import {AnalyticsComponent} from './components/analytics/analytics.component'
const appRoutes :Routes = [
    { path :'', component: LoginComponent },
    {path:'dashboard',component: DashboardComponent,canActivate:[AuthGuard]},
    {path:'admin',component: AdminComponent,canActivate:[AuthGuard]},
    {path:'register',component: RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
    {path:'analytics',component:AnalyticsComponent,canActivate:[AuthGuard]},

    {path:'view-Profile/:id',component: ViewProfileComponent,canActivate:[AuthGuard]},
    {path :'**',component: LoginComponent} 
]


@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(appRoutes)],
    providers: [],
    bootstrap: [],
    exports:[RouterModule]
  })
  export class AppRoutingModule { }