import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { ContactService } from 'src/app/services/contact/contact.service';
import { NgxPaginationModule } from 'ngx-pagination'; // Import NgxPaginationModule
@Component({
  selector: 'app-top-selling',
  standalone: true,
  imports: [NgFor,NgxPaginationModule],
  templateUrl: './top-selling.component.html'
})
export class TopSellingComponent implements OnInit {
  collection = [];
  p: number = 1; // current page number
  itemsPerPage: number = 4; // items per page
  constructor(private _contactService:ContactService) {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }
  getData:any
  ngOnInit() {
    this.fetchAllContacts();
  }

    // Fetch all contacts
    fetchAllContacts() {
      this._contactService.onContactGetAll().subscribe(res => {
        this.getData = res;
      });
    }

  editContact(contact: ContactService) { // Specify the type as 'Contact'
    console.log('Edit contact:', contact);
    // Add your edit logic here
  }

  onDelete(id: any){
    this._contactService.onContactDelete(id).subscribe(res =>{
      console.log(res)
      this._contactService.onContactGetAll().subscribe( res=>{
        this.getData=res
      })
  
    })
  }

    // Delete all contacts
    onDeleteAll() {
      this._contactService.onContactDeleteAll().subscribe(res => {
        console.log('All contacts deleted', res);
        this.fetchAllContacts(); // Refresh the contact list after deleting all
      });
    }
}
