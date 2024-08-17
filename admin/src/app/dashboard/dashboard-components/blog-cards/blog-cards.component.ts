import { Component, OnInit } from '@angular/core';

import { NgFor, NgIf } from '@angular/common';
import { BlogService } from 'src/app/services/blogs/blog.service';

@Component({
  selector: 'app-blog-cards',
  templateUrl: './blog-cards.component.html'
})
export class BlogCardsComponent implements OnInit {
  collection = [];
  p: number = 1; // current page number
  itemsPerPage: number = 4; // items per page
  constructor(private _blogService:BlogService) {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }
  getData:any
  ngOnInit() {
    this._blogService.onBlogGetAll().subscribe( res=>{
      this.getData=res
    })
  }
editBlog(blog: BlogService) { // Specify the type as 'Contact'
  console.log('Edit blog:', blog);
  // Add your edit logic here
}

onDelete(id: any){
  this._blogService.onBlogDelete(id).subscribe(res =>{
    console.log(res)
    this._blogService.onBlogGetAll().subscribe( res=>{
      this.getData=res
    })

  })
}

}
