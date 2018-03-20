import { AuthGuard } from './auth.guard';
import { JwtHelper } from 'angular2-jwt';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { ConfirmService, ConfirmTemplateDirective } from './confirmService';
import { MaterialModule } from './../shared/material.module';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { ConfirmModalComponent } from './confirmService';
import { SigninComponent } from './signin/signin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmState } from './confirmService'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [SigninComponent, SignupComponent, ConfirmModalComponent, ConfirmTemplateDirective],
  entryComponents: [SigninComponent, SignupComponent, ConfirmModalComponent],
  exports: [SigninComponent, SignupComponent, ConfirmModalComponent, ConfirmTemplateDirective],
  providers: [AuthService, ConfirmService, ConfirmState, UserService, JwtHelper, AuthGuard]
})
export class AuthModule { }
