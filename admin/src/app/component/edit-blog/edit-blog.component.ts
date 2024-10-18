import { HttpEventType } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { FileService } from 'src/app/services/file.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent {

  p: number = 1;
  itemsPerPage: number = 4;
  env: any;
  selectedBlog: any = {}; 
  getData: any;
  myForm!: FormGroup;
  blogToDeleteId: string | null = null;  
  image: File[];
  collection: any = []; 
  
  
  @ViewChild('confirmDeleteModal') confirmDeleteModal: any;
  constructor(
    private _blogService: ApiService, 
    private fb: FormBuilder,
    private modalService: NgbModal,
    private fileServ : FileService
  ) {
    this.env = environment.url
    this.myForm = this.fb.group({
      image: [null, Validators.required],
      category: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      website: ['', Validators.required],
    });
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }

  ngOnInit() {
    this.fetchAllBlogs();
  }

  fetchAllBlogs() {
    this._blogService.get('blogs',{}).subscribe(res => {
      this.getData = res;
    });
  }

  editBlog(blog: any, content: any) {
    this.selectedBlog = { ...blog }; 
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onDelete(id: any) {
    this.blogToDeleteId = id;  
    const modalRef = this.modalService.open(this.confirmDeleteModal, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.result.then((result) => {
      if (result === 'Delete' && this.blogToDeleteId) {
        this._blogService.delete('blogs',this.blogToDeleteId).subscribe(res => {
          console.log(res);
          this.fetchAllBlogs();
        });
      }
    });
  }

  confirmDelete(modal: any) {
    modal.close('Delete'); 
  }

  onDeleteAll() {
    // this._blogService.onBlogDeleteAll().subscribe(res => {
    //   console.log('All Blogs deleted', res);
    //   this.fetchAllBlogs(); // Refresh the blog list after deleting all
    // });
  }

  // saveChanges(modal: any) {
  // }

  handleFileInput(event: any) {
    this.selectedBlog.image = event.target.files[0]; 
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

  uploadImage(modal:any) {
    if (this.image.length > 0) {
      this.fileServ.uploadFile(this.image[0]).subscribe(
        (res: any) => {
          if (res.type === HttpEventType.Response) {
            const body: any = res.body;
            const imagePath = body.file.path;
            this.selectedBlog.image = imagePath;
            console.log('blog', this.selectedBlog)
            this._blogService.put('blogs',this.selectedBlog._id, this.selectedBlog).subscribe(res => {
              this.fetchAllBlogs();
              modal.close(); 
            });
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

}
