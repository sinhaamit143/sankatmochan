import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/services/alert.service';
import { FileService } from 'src/app/services/file.service';
import { environment } from 'src/environments/environment';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-blog-cards',
  templateUrl: './blog-cards.component.html'
})
export class BlogCardsComponent implements OnInit {
  
  collection = [];
  p: number = 1; 
  itemsPerPage: number = 4; 
  getData:any
  env: any;
  image: File[];
  selectedBlog: any = {};

  constructor(
    private _blogService : ApiService,
    private as : AlertService,
    private fileServ : FileService
  ) {
    this.env = environment.url;
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }

  }
  ngOnInit() {
    this.getBlogs()
  }

  getBlogs() {
    this._blogService.get('blogs',{}).subscribe(res => {
      this.getData = res;
    });
  }

  handleFileInput(event: any) {
    this.selectedBlog.image = event.target.files[0]; 
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
              this.getBlogs();
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