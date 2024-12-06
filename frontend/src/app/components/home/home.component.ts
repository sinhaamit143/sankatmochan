import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact/contact.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myForm!: FormGroup; // Declare myForm here
  isLoading = false;

  constructor(private fb: FormBuilder, private _contactService: ContactService) { }

  ngOnInit() {

    this.myForm = this.fb.group({ // Initialize myForm here
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      countryCode:['', Validators.required],
      number: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      schedule_date: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.isLoading = true;
      const formData = {
        ...this.myForm.value,
        schedule_date: new Date(this.myForm.value.schedule_date) // Ensure the date is sent in ISO format
      };
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
