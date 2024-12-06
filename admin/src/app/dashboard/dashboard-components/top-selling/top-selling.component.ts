// top-selling.component.ts
import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination'; // Import NgxPaginationModule
import { ContactService } from 'src/app/services/contact.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-top-selling',
  standalone: true,
  imports: [NgFor,NgxPaginationModule,DatePipe],
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
  getData: any[] = [];
  ngOnInit() {
    this.fetchAllContacts();
  }


// Fetch all contacts
fetchAllContacts() {
  console.log('Fetching all contacts...');
  this._contactService.onContactGetAll().subscribe((res: any[]) => {
    console.log('Response data:', res);
    console.log('Response data length:', (res as any[]).length);
    console.log('Response data type:', typeof res);
    this.getData = res;
    console.log('Data length after assignment::', this.getData.length);
  }, error => {
    console.error('Error fetching contacts:', error);
  });
}

  editContact(contact: any) { // Specify the type as 'Contact'
    console.log('Edit contact:', contact);
    // Add your edit logic here
  }

  onDelete(id: any){
    this._contactService.onContactDelete(id).subscribe((res: any[]) =>{
      console.log(res)
      this._contactService.onContactGetAll().subscribe((res: any[]) =>{
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