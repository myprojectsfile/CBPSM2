import { AuthService } from './../auth/auth.service';
import { ConfirmService } from './../auth/confirmService';
import { Component, OnInit, ViewChild, TemplateRef, AfterContentInit, ViewContainerRef, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SigninComponent } from '../auth/signin/signin.component';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

    closeResult: string;
    constructor(private httpService: Http, private authServie: AuthService, private modalService: NgbModal) { }
    apiValues: string[] = [];

    @ViewChild('tmpModal') private tmpModal: TemplateRef<any>;

    // private template: Subject<TemplateRef<any>> = new Subject();

    // getTemplateRef(): Observable<TemplateRef<any>> {
    //     return this.template.asObservable();
    // }

    @ViewChild('signInModalTemplate') private signInModalTemplate: TemplateRef<any>;
    signedIn: boolean = false;

    signIn() {
        // this.modalService.open(this.content);
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
        // if (this.content) {
        //     this.template.next(this.content);
        //     this.template.complete();
        // }
    }

    open() {
        this.modalService.open(SigninComponent).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }
    
      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return  `with: ${reason}`;
        }
      }
}
