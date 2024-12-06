import { Component, OnInit, ViewChild } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DatePipe } from '@angular/common';
import { ContactForm, ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, FormsModule, NgxPaginationModule,DatePipe],
  templateUrl: './table.component.html'  // Ensure the path is correct
})
export class TableComponent implements OnInit {
  collection = [];
  p: number = 1;
  itemsPerPage: number = 4;
  getData: any;
  selectedContact: ContactForm | undefined;
  contact: any;
  isDeletingAll = false;  // Flag to disable the button

  // ViewChild to get the reference to the modal template
  @ViewChild('confirmDeleteModal') confirmDeleteModal: any;
  private contactToDeleteId: string | null = null;  // Store the ID of the contact to be deleted

  constructor(private _contactService: ContactService, private modalService: NgbModal) {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }

  ngOnInit() {
    this.fetchAllContacts();
  }

  fetchAllContacts() {
    this._contactService.onContactGetAll().subscribe(res => {
      this.getData = res;
    });
  }

  editContact(contact: any, content: any) {
    this.selectedContact = { ...contact };
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result === 'Save' && this.selectedContact) {
        this.updateContact(this.selectedContact._id, this.selectedContact);
      }
    });
  }

  updateContact(id: string, updatedContact: ContactForm) {
    this._contactService.onContactUpdate(id, updatedContact).subscribe(res => {
      const index = this.getData.findIndex((c: any) => c._id === id);
      if (index !== -1) {
        this.getData[index] = updatedContact;
      }
    });
  }

  onDelete(id: string) {
    this.contactToDeleteId = id;  // Set the ID of the contact to be deleted
    const modalRef = this.modalService.open(this.confirmDeleteModal, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.result.then((result) => {
      if (result === 'Delete' && this.contactToDeleteId) {
        this._contactService.onContactDelete(this.contactToDeleteId).subscribe(res => {
          console.log(res);
          this.fetchAllContacts();
        });
      }
    });
  }

  confirmDelete(modal: any) {
    modal.close('Delete');  // Trigger the deletion action
  }

  confirmDeleteAll() {
    const modalRef = this.modalService.open(this.confirmDeleteAllModal, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.result.then((result) => {
      if (result === 'Confirm') {
        this.confirmDeleteAllAction();
      }
    });
  }
  confirmDeleteAllModal(confirmDeleteAllModal: any, arg1: { ariaLabelledBy: string; }) {
    throw new Error('Method not implemented.');
  }

  confirmDeleteAllAction() {
    this.isDeletingAll = true;  // Disable the button
    setTimeout(() => {
      this._contactService.onContactDeleteAll().subscribe(res => {
        console.log('All contacts deleted', res);
        this.fetchAllContacts();
        this.isDeletingAll = false;  // Re-enable the button after 10 seconds
      });
    }, 10000); // 10 seconds delay
  }
}
