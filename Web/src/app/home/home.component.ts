import { AuthService } from './../auth/auth.service';
import { ConfirmService } from './../auth/confirmService';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ModalService } from '../shared/modal.module';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    constructor(private httpService: Http, private authServie: AuthService, private conf: ConfirmService, private modalService: ModalService) { }
    apiValues: string[] = [];

    signedIn: boolean = false;

    signIn() {
        this.modalService.showModal({ modalTitle: 'Confirm deletion' }).then(
            () => {
                console.log('deleting...');
            },
            () => {
                console.log('not deleting...');
            });
    }
    signUp() {
        this.authServie.signUp();
    }

    isSignedIn() {
        return this.authServie.isSignedIn();
    }
    signOut() {
        return this.authServie.signOut();
    }
    printClaims() {

    }
}
