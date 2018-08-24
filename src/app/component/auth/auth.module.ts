import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { authComponents } from './index';
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

@NgModule({
  declarations: [
    ...authComponents
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {  }