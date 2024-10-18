import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog/blog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  getData: any;
  p: number = 1;
  itemsPerPage: number = 6; 
  id: any;
  data: any;
  env:any

  constructor(private _blogService: BlogService, private route: ActivatedRoute) {
    this.env = environment.url;
    this.route.params.subscribe((param: any) => {
      this.id = param.id;
      if (this.id) {
        this._blogService.onBlogFindOne(this.id).subscribe((res: any) => {
          this.data = res;
        }, err => {
          console.log(err.message)
        })
      }
    })
  }

  ngOnInit(): void {
    this._blogService.onBlogGetAllPublic().subscribe(res => { // Call the public route
      this.getData = res;
    });
  }

  getPageArray(totalItems: number): number[] {
    return Array(Math.ceil(totalItems / this.itemsPerPage)).fill(0).map((x, i) => i + 1);
  }
}