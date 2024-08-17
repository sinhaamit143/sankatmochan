import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
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

  constructor(private _blogService: BlogService) {}

  ngOnInit(): void {
    this._blogService.onBlogGetAll().subscribe(res => {
      this.getData = res;
    });
  }

  getPageArray(totalItems: number): number[] {
    return Array(Math.ceil(totalItems / this.itemsPerPage)).fill(0).map((x, i) => i + 1);
  }
}