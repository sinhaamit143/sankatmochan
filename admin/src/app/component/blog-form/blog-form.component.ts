import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss'],
})
export class BlogFormComponent implements OnInit {
  myForm!: FormGroup;
  isLoading = false;
  image: File[] = []; 

  constructor(
    private fb: FormBuilder,
    private fileServ: FileService,
    private api: ApiService,
    private as: AlertService,
    private route : Router
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

  uploadImage(frm:any) {
    if (this.image.length > 0) {
      this.fileServ.uploadFile(this.image[0]).subscribe(
        (res: any) => {
          if (res.type === HttpEventType.Response) {
            const body: any = res.body;
            const imagePath = body.file.path;
            frm.value.image = imagePath;
            this.onSubmit(frm);
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

  onSubmit(frm:any) {
    if (frm.valid) {
      this.isLoading = true;
      this.api.post('blogs', frm.value ).subscribe(
        (res: any) => {
          if (res) {
            this.isLoading = false;
            this.route.navigate(['/component/blog-list'])
            this.as.successToast('Blog Posted');
          } else {
            this.as.warningToast(res.error.message);
          }
        },
        (error) => {
          this.as.errorToast(error.message);
        }
      );
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
