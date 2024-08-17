import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from 'src/app/services/contact/contact.service';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor],
  templateUrl: 'table.component.html'
})
export class TableComponent {
  getData:any


 

  constructor(private _contactService:ContactService) {}

  ngOnInit() {
    this._contactService.onContactGetAll().subscribe( res=>{
      this.getData=res
    })
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
}