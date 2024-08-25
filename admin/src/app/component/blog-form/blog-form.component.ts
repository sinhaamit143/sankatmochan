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
    if (this.myForm.valid ) {
      this.isLoading = true;
      const formData = new FormData();

    formData.append('image', this.file, this.file.name);
    formData.append('category', this.myForm.value.category);
    formData.append('title', this.myForm.value.title);
    formData.append('description', this.myForm.value.description);
    formData.append('website', this.myForm.value.website);

    this.http.post("http://localhost:5000/blogs", formData).subscribe(res => {
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
    }else {
      alert("Please fill all the fields");
      this.isLoading = false;
    }
  }

  // On file Select
  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      
      this.file = file;
    }
  }

  onFileSelected(event: Event): void {
    
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    const dropzone = event.currentTarget as HTMLElement;
    dropzone.classList.add('hover');
  }

  onDragLeave(event: DragEvent): void {
    const dropzone = event.currentTarget as HTMLElement;
    dropzone.classList.remove('hover');
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const dropzone = event.currentTarget as HTMLElement;
    dropzone.classList.remove('hover');
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.onFileSelected({ target: event.dataTransfer } as unknown as Event);
    }
  }
}