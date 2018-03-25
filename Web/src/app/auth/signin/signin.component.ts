import { UserService } from './../user.service';
import { Component, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ModalState, ModalOptions } from '../../shared/modal.module';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})


export class SigninComponent implements AfterViewInit {
  constructor(private userService: UserService, private modalState: ModalState) {
    this.modalOptions = this.modalState.modalOptions;
  }

  @ViewChild('template')
  template: TemplateRef<any>

  username = '';
  password = '';
  modalOptions: ModalOptions;

  ngAfterViewInit() {
    this.modalState.template = this.template;
  }

  // signIn() {
  //   this.userService.signIn(this.username, this.password)
  //     .subscribe(res => {
  //       if (res.ok && res.status === 200) {
  //         // if signIn succeeded:
  //         // write token to localstorage
  //         localStorage.setItem('token', res.text());
  //         this.dialogRef.close(true);
  //       } else if (!res.ok && res.status === 401) {
  //         console.log('user or password is not correct');
  //       } else {
  //         console.log('failed in login operation.');
  //       }
  //     }, error => {
  //       console.log('user or password is not correct');
  //     });
  // }

  yes() {
    this.modalState.modal.close('confirmed');
  }

  no() {
    this.modalState.modal.dismiss('not confirmed');
  }

}

