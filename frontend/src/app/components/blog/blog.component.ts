import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  getData: any;
  p: number = 1; // current page number
  itemsPerPage: number = 6; // items per page
  id: any;
  data: any;

  constructor(private _blogService: BlogService, private route: ActivatedRoute) {
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
    this._blogService.onBlogGetAll().subscribe(res => {
      this.getData = res;
    });
  }

  getPageArray(totalItems: number): number[] {
    return Array(Math.ceil(totalItems / this.itemsPerPage)).fill(0).map((x, i) => i + 1);
  }
}