import { Component, OnInit, ViewChild } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ContactService, ContactForm } from 'src/app/services/contact/contact.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, FormsModule, NgxPaginationModule],
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
  @ViewChild('confirmDeleteAllModal') confirmDeleteAllModal: any;

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
    this._contactService.onContactDelete(id).subscribe(res => {
      console.log(res);
      this.fetchAllContacts();
    });
  }

  confirmDeleteAll() {
    const modalRef = this.modalService.open(this.confirmDeleteAllModal, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.result.then((result) => {
      if (result === 'Confirm') {
        this.confirmDeleteAllAction();
      }
    });
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
