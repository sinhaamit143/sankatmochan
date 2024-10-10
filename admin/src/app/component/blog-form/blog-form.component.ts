import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from 'src/app/services/blogs/blog.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss'],
})
export class BlogFormComponent implements OnInit {

  myForm!: FormGroup; // Declare myForm here
  isLoading = false;
  files: File[] = []; // Store files

  constructor(private fb: FormBuilder, private http: HttpClient, private _blogFormService: BlogService) {
    this.myForm = this.fb.group({
      image: ['', Validators.required],
      category: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      website: ['', Validators.required]
    });
  }

  ngOnInit() {
    // No need to reinitialize myForm here
  }

  onSubmit() {
    if (this.myForm.valid && this.files.length > 0) { // Check if files exist
      this.isLoading = true;
      const formData = new FormData();

      this.files.forEach(file => {
        formData.append('image', file, file.name); // Add all files
      });
      formData.append('category', this.myForm.value.category);
      formData.append('title', this.myForm.value.title);
      formData.append('description', this.myForm.value.description);
      formData.append('website', this.myForm.value.website);

      // Get the token (you may have it stored in localStorage or a service)
      const token = localStorage.getItem('x-auth-token') || '';

      // Include the token in the headers
      this.http.post("http://localhost:5000/blogs", formData, {
        headers: {
          'x-auth-token': token
        }
      }).subscribe(
        (res) => {
          console.log(res);
          alert("Blogs created successfully");
          this.myForm.reset(); // Reset the form
          this.files = []; // Clear the files array
          this.isLoading = false;
        },
        (error) => {
          console.error(error);
          alert("Error sending Blog data. Please try again.");
          this.isLoading = false;
        }
      );
    } else {
      alert("Please fill all the fields");
      this.isLoading = false;
    }
  }

  // This function handles file selection from the drag-and-drop area
  onSelect(event: any): void {
    const file: File = event.addedFiles[0]; // Get the first added file
    if (file) {
      this.files.push(file); // Store the file

      // Update the form with the selected file
      this.myForm.patchValue({
        image: file // Update the 'image' form field
      });
      this.myForm.get('image')?.updateValueAndValidity(); // Trigger validation
    }
  }

  // This function handles the removal of a selected file
  onRemove(file: File): void {
    const index = this.files.indexOf(file);
    if (index >= 0) {
      this.files.splice(index, 1); // Remove the file
      if (this.files.length === 0) {
        this.myForm.patchValue({
          image: null // Clear the 'image' form field if no files remain
        });
        this.myForm.get('image')?.updateValueAndValidity(); // Trigger validation
      }
    }
  }
}
