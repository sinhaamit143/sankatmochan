import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-blog-cards',
  templateUrl: './blog-cards.component.html'
})
export class BlogCardsComponent implements OnInit {
  
  collection = [];
  p: number = 1; 
  itemsPerPage: number = 4; 
  getData:any

  constructor(
    private api : ApiService,
    private as : AlertService
  ) {

    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }

  }
  ngOnInit() {
    this.getBlogs()
  }

  getBlogs() {
    this.api.get('blogs', {}).subscribe((res: any) => {
      if (res) {
        this.getData = res
      } else {
        this.as.warningToast(res.error.message)
      }
    })
  }

}