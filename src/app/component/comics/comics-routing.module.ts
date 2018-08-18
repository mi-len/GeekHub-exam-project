import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../navigation/guards/auth.guard";

import { DetailsComponent } from "./comic/details/details.component";
import { EditComponent } from "./comic/edit/edit.component";
import { LandingComponent } from "../landing/landing.component";
import { AddComponent } from "./comic/add/add.component";

const comicsRoutes : Routes = [
    { path: 'details/:id', component: DetailsComponent},
    { path: 'edit/:id', component: EditComponent },
    { path: 'add', component: AddComponent}
]

@NgModule({
    imports : [
        RouterModule.forChild(comicsRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class ComicsRoutingModule { }