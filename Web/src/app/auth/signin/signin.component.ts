import { UserService } from './../user.service';
import { Component, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})


export class SigninComponent{
  constructor(private userService: UserService, private ngbActiveModal: NgbActiveModal) {
  }


  username = '';
  password = '';


  signIn() {
    this.userService.signIn(this.username, this.password)
      .subscribe(res => {
        if (res.ok && res.status === 200) {
          // if signIn succeeded:
          // write token to localstorage
          localStorage.setItem('token', res.text());
          this.ngbActiveModal.close(true);
        } else if (!res.ok && res.status === 401) {
          console.log('user or password is not correct');
        } else {
          console.log('failed in login operation.');
        }
      }, error => {
        console.log('user or password is not correct');
      });
  }
  close(){
    this.ngbActiveModal.close('close');
  }
  dismiss(){
    this.ngbActiveModal.dismiss('dismiss');
  }
}

