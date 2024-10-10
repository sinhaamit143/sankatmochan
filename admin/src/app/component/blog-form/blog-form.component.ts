import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from 'src/app/services/blogs/blog.service';
import { FileService } from 'src/app/services/files/files.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss'],
})
export class BlogFormComponent implements OnInit {
  myForm!: FormGroup;
  isLoading = false;
  image: any = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private fileServ: FileService
  ) {
    this.myForm = this.fb.group({
      image: ['', Validators.required],
      category: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      website: ['', Validators.required],
    });
  }

  ngOnInit() {}

  uploadImage() {
    if (this.image[0]) {
      this.fileServ.uploadFile(this.image[0]).subscribe(
        (res: any) => {
          if (res.type == HttpEventType.Response) {
            const body: any = res.body;
            this.image = body.file.path;
            alert('Image Uploaded Successfully');
            this.onSubmit(this.image)
          }
        },
        (error) => {
          alert(error.message);
        }
      );
    } else {
      alert('Please Select Image');
    }
  }

  onSubmit(image) {
    if (this.myForm.valid && image.length > 0) {
      this.isLoading = true;
      const formData = new FormData();
      formData.append('image', image, this.image[0].name);
      formData.append('category', this.myForm.value.category);
      formData.append('title', this.myForm.value.title);
      formData.append('description', this.myForm.value.description);
      formData.append('website', this.myForm.value.website);

      const token = localStorage.getItem('x-auth-token') || '';

      this.http
        .post(`${environment.url}/blogs`, formData, {
          headers: {
            'x-auth-token': token,
          },
        })
        .subscribe(
          (res) => {
            console.log(res);
            alert('Blogs created successfully');
            this.myForm.reset();
            this.image = [];
            this.isLoading = false;
          },
          (error) => {
            console.error(error);
            alert('Error sending Blog data. Please try again.');
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
      this.image.push(file);
    } else {
      this.image = [];
    }
  }

  onRemove(file: File): void {
    const index = this.image.indexOf(file);
    if (index >= 0) {
      this.image.splice(index, 1);
      if (this.image.length === 0) {
        this.myForm.patchValue({
          image: null,
        });
        this.myForm.get('image')?.updateValueAndValidity();
      }
    }
  }
}
