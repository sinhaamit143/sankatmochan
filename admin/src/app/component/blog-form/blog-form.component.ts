import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from 'src/app/services/blogs/blog.service';
import { FileService } from 'src/app/services/files/files.service';
import { TokenService } from 'src/app/services/token/token.service'; // Import TokenService
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss'],
})
export class BlogFormComponent implements OnInit {
  myForm!: FormGroup;
  isLoading = false;
  image: File[] = []; // Change to an array of File

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private fileServ: FileService,
    private blogService: BlogService,
    private tokenService: TokenService // Inject TokenService
  ) {
    this.myForm = this.fb.group({
      image: [null, Validators.required],
      category: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      website: ['', Validators.required],
    });
  }

  ngOnInit() {}

  uploadImage() {
    if (this.image.length > 0) { // Check if there is at least one file
      this.fileServ.uploadFile(this.image[0]).subscribe(
        (res: any) => {
          if (res.type === HttpEventType.Response) {
            const body: any = res.body;
            const imagePath = body.file.path; // Assuming this is the correct response structure
            alert('Image Uploaded Successfully');
            this.onSubmit(imagePath); // Pass the string path to onSubmit
          }
        },
        (error) => {
          alert(`Error uploading image: ${error.message}`);
        }
      );
    } else {
      alert('Please Select Image');
    }
  }

  onSubmit(imagePath: string) {
    if (this.myForm.valid) { // Check if image array is not empty
      this.isLoading = true;
      const formData = new FormData();
      
      formData.append('image', this.image[0], this.image[0].name); // Append the File object directly
      formData.append('category', this.myForm.value.category);
      formData.append('title', this.myForm.value.title);
      formData.append('description', this.myForm.value.description);
      formData.append('website', this.myForm.value.website);

      const token = this.tokenService.getToken() || ''; // Use TokenService
      console.log('Token:', this.tokenService.getToken());
      this.http
        .post(`${environment.url}/blogs`, formData, {
          headers: {
            'x-auth-token': token, // Send the token in headers
          },
        })
        .subscribe(
          (res) => {
            console.log(res);
            alert('Blog created successfully');
            this.myForm.reset();
            this.image = []; // Reset image array
            this.isLoading = false;
          },
          (error) => {
            console.error(error);
            alert('Error sending blog data. Please try again.');
            this.isLoading = false;
          }
        );
    } else {
      alert('Please fill all the fields');
      this.isLoading = false;
    }
  }

  onSelect(event: any): void {
    const file: File = event.addedFiles[0];
    if (file) {
      this.image = [file]; // Store the file in an array
      this.myForm.patchValue({ image: file });
      this.myForm.get('image')?.updateValueAndValidity();
    }
  }

  onRemove(file: File): void {
    if (this.image.includes(file)) {
      this.image = [];
      this.myForm.patchValue({ image: null });
      this.myForm.get('image')?.updateValueAndValidity();
    }
  }
}
