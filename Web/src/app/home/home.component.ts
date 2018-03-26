import { AuthService } from './../auth/auth.service';
import { ConfirmService } from './../auth/confirmService';
import { Component, OnInit, ViewChild, TemplateRef, AfterContentInit, ViewContainerRef, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { ModalService } from '../shared/modal.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SigninComponent } from '../auth/signin/signin.component';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {




    constructor(private httpService: Http, private authServie: AuthService, private ngbModal: NgbModal) { }
    apiValues: string[] = [];
    
    @ViewChild(TemplateRef) private content: TemplateRef<any>;

    private template: Subject<TemplateRef<any>> = new Subject();

    getTemplateRef(): Observable<TemplateRef<any>> {
        return this.template.asObservable();
    }

    @ViewChild('signInModalTemplate') private signInModalTemplate: TemplateRef<any>;
    signedIn: boolean = false;

    signIn() {
        this.ngbModal.open(this.content);
        // this.modalService.showModal({ modalTitle: 'Confirm deletion' }).then(
        //     () => {
        //         console.log('deleting...');
        //     },
        //     () => {
        //         console.log('not deleting...');
        //     });
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
    ngAfterViewInit(): any {

        if (this.content) {
            this.template.next(this.content);
            this.template.complete();
        }
    }
}
