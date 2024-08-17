import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { ContactService } from 'src/app/services/contact/contact.service';
@Component({
  selector: 'app-top-selling',
  standalone: true,
  imports: [NgFor],
  templateUrl: './top-selling.component.html'
})
export class TopSellingComponent implements OnInit {

  constructor(private _contactService:ContactService) {}
  getData:any
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
