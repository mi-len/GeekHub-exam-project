import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./component/auth/login/login.component";
import { RegisterComponent } from "./component/auth/register/register.component";
import { HomeComponent } from "./component/home/home.component"
import { PageNotFoundComponent } from "./navigation/page-not-found/page-not-found.component";
import { AuthGuard } from "./navigation/guards/auth.guard";
import { UserAreaComponent } from "./component/comics/user-area/user-area/user-area.component";
import { AdminAreaComponent } from "./component/comics/user-area/admin-area/admin-area.component";
// import { ComicsRoutingModule } from "./component/comics/comics-routing.module";
import { LandingComponent } from "./component/landing/landing.component";
import { ComicsModule } from "./component/comics/comics.module";

const routes : Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] }, 
    { path: 'landing', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'comics', loadChildren: () => ComicsModule, canActivate: [ AuthGuard ] },
    { path: 'my', component: UserAreaComponent, canActivate: [ AuthGuard ] },
    { path: 'admin', component: AdminAreaComponent, canActivate: [ AuthGuard ]  },
    { path: '**', component: PageNotFoundComponent }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
