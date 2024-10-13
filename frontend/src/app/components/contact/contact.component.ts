import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  myForm!: FormGroup; // Declare myForm here
  isLoading = false;

  constructor(private fb: FormBuilder, private _contactService: ContactService) { }

  ngOnInit() {
    this.myForm = this.fb.group({ // Initialize myForm here
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.isLoading = true;
      this._contactService.onContactSave(this.myForm.value).subscribe(
        (response) => {
          console.log(response);
          alert("Thank you for contacting us. We will get back to you soon.");
          this.myForm.reset();
          this.isLoading = false;
        },
        (error) => {
          console.error(error);
          alert("Error sending contact data. Please try again.");
          this.isLoading = false;
        }
      );
    } else {
      alert("Please fill all the fields");
      this.isLoading = false;
    }
  }
}
