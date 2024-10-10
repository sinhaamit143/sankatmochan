import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogForm, BlogService } from 'src/app/services/blogs/blog.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss'],
})
export class BlogFormComponent implements OnInit {

  myForm!: FormGroup; // Declare myForm here
  file: File | null = null;
  isLoading = false;
  
files: any []=[]

  constructor(private fb: FormBuilder, private http: HttpClient, private _blogFormService: BlogService) { 
    this.myForm = this.fb.group({
      file: ['']
    });
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    this.myForm.patchValue({
      file: file
    });
  }
  imagePreview: string | ArrayBuffer | null = null;

  ngOnInit() {
    this.myForm = this.fb.group({ // Initialize myForm here
      image: ['', Validators.required],
      category: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      website: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.myForm.valid && this.file) {
      this.isLoading = true;
      const formData = new FormData();
  
      formData.append('image', this.file, this.file.name);
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
          this.myForm?.reset();
          this.imagePreview = null;
          this.file = null;
          this.isLoading = false;
  
          // Clear the file input field
          const fileInput = document.getElementById('blogImage') as HTMLInputElement;
          if (fileInput) {
            fileInput.value = '';
          }
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
// This function handles file selection from the drag-and-drop area
onSelect(event: any): void {
  const file: File = event.addedFiles[0]; // Get the first added file
  if (file) {
    this.file = file; // Store the file

    // Update the form with the selected file
    this.myForm.patchValue({
      image: file // Update the 'image' form field
    });
    this.myForm.get('image')?.updateValueAndValidity(); // Trigger validation

    // Create a preview of the image using FileReader
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);

    // Add the file to the array for display in the dropzone area
    this.files.push(file);
  }
}

// This function handles the removal of a selected file
onRemove(event: any): void {
  const index = this.files.indexOf(event);
  if (index >= 0) {
    this.files.splice(index, 1);

    // Reset the file if the removed file is the one currently selected
    if (this.file === event) {
      this.file = null;
      this.imagePreview = null;
      this.myForm.patchValue({
        image: null // Clear the 'image' form field
      });
      this.myForm.get('image')?.updateValueAndValidity(); // Trigger validation
    }
  }
}



}