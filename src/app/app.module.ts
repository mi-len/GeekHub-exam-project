import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AuthModule } from './component/auth/auth.module'
import { ComicsModule } from './component/comics/comics.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './component/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PageNotFoundComponent } from './navigation/page-not-found/page-not-found.component';
import { LandingComponent } from './component/landing/landing.component';
import { FooterComponent } from './component/footer/footer.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor'

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    PageNotFoundComponent,
    LandingComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AuthModule,
    ComicsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
