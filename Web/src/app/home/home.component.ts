import { AuthService } from './../auth/auth.service';
import { ConfirmService } from './../auth/confirmService';
import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    constructor(private httpService: Http, private authServie: AuthService, private conf: ConfirmService) { }
    apiValues: string[] = [];

    signedIn: boolean = false;

    signIn() {
        // this.authServie.signIn();
        this.conf.confirm({ title: 'Confirm deletion', message: 'Do you really want to delete this foo?' }).then(
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
