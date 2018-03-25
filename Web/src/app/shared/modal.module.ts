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
  declarations: [ModalTemplateDirective],
  exports: [ModalTemplateDirective],
  providers: [ModalService, ModalState]
})
export class ModalModule { }
