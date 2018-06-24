import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module'
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { ProfileComponent } from './components/profile/profile.component'
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from'./guards/auth.guard'
import { NotAuthGuard } from './guards//notAuth.guard';
import { BlogComponent } from './components/blog/blog.component'
import {ProfileService} from './services/profile.service';
import { AdminComponent } from './components/admin/admin.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { AdminServiceService } from './services/admin-service.service';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    BlogComponent,
    AdminComponent,
    AdminNavbarComponent,
    ViewProfileComponent,
    AnalyticsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    FlashMessagesModule,
    // NgbModule.forRoot(),
    ChartsModule
  ],
  providers: [AuthService,AuthGuard,NotAuthGuard,ProfileService,AdminServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
