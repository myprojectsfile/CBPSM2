import { CommonModule } from '@angular/common';
import { NgModule, Component, Injectable, Directive, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';



export interface ModalOptions {
  modalTitle: string
}

@Injectable()
export class ModalState {
  modalOptions: ModalOptions;
  modal: NgbModalRef;
  template: TemplateRef<any>;
}

@Injectable()
export class ModalService {

  constructor(private ngbModalService: NgbModal, private state: ModalState) { }

  /**
   * Opens a confirmation modal
   * @param options the options for the modal (title and message)
   * @returns {Promise<any>} a promise that is fulfilled when the user chooses to confirm, and rejected when
   * the user chooses not to confirm, or closes the modal
   */
  showModal(options: ModalOptions): Promise<any> {
    this.state.modalOptions = options;
    this.state.modal = this.ngbModalService.open(this.state.template);
    return this.state.modal.result;
  }
}


@Component({
  selector: 'modal-component',
  template: `<div class="modal-header">
    <button type="button" class="close" aria-label="Close" (click)="no()">
      <span aria-hidden="true">&times;</span>
    </button>
    <h4 class="modal-title">{{ options.modalTitle}}</h4>
  </div>
  <div class="modal-body">
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-danger" (click)="yes()">Yes</button>
    <button type="button" class="btn btn-secondary" (click)="no()">No</button>
  </div>`
})
export class ModalComponent {

  options: ModalOptions;

  constructor(private state: ModalState) {
    this.options = state.modalOptions;
  }

  yes() {
    this.state.modal.close('confirmed');
  }

  no() {
    this.state.modal.dismiss('not confirmed');
  }
}

@Directive({
  selector: "ng-template[modalComponent]"
})
export class ModalTemplateDirective {
  constructor(modalTemplate: TemplateRef<any>, modalState: ModalState) {
    modalState.template = modalTemplate;
  }
}


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ModalTemplateDirective, ModalComponent],
  entryComponents:[ModalComponent],
  exports: [ModalTemplateDirective, ModalComponent],
  providers: [ModalService, ModalState]
})
export class ModalModule { }
