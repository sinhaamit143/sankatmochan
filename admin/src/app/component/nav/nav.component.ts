import { Component, ViewChild, AfterViewChecked, ElementRef, Renderer2 } from '@angular/core';
import { NgbNavModule, NgbDropdownModule, NgbAlertModule, NgbTooltip, NgbTooltipModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { NgFor, NgIf } from '@angular/common';
import { BlogService } from 'src/app/services/blogs/blog.service';
import { NgxPaginationModule } from 'ngx-pagination'; // Import NgxPaginationModule

@Component({
  selector: 'app-ngbd-nav',
  standalone: true,
  imports: [
    NgbNavModule, 
    NgbDropdownModule, 
    NgFor, 
    NgIf, 
    NgbAlertModule, 
    FormsModule, 
    NgxPaginationModule, 
    NgbTooltipModule
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NgbdnavBasicComponent implements AfterViewChecked {

  @ViewChild(NgbTooltip) tooltip: NgbTooltip;
  @ViewChild('tooltipTrigger', { read: ElementRef }) tooltipTrigger: ElementRef;

  active2 = 'top';
  collection = [];
  p: number = 1; // current page number
  itemsPerPage: number = 4; // items per page

  selectedBlog: any = {}; // Store the selected blog data for editing
  getData: any;

  constructor(
    private _blogService: BlogService, 
    private modalService: NgbModal, 
    private renderer: Renderer2
  ) {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }

  ngOnInit() {
    this.fetchAllBlogs();
  }

  ngAfterViewChecked() {
    if (this.tooltip && this.tooltip.isOpen()) {
      this.adjustTooltipPosition();
    }
  }

  adjustTooltipPosition() {
    const tooltipElement = document.querySelector('.tooltip.show') as HTMLElement;
    const tooltipReferenceElement = this.tooltipTrigger.nativeElement as HTMLElement;

    if (tooltipElement && tooltipReferenceElement) {
      const rect = tooltipReferenceElement.getBoundingClientRect();

      this.renderer.setStyle(tooltipElement, 'left', `${rect.left + window.scrollX}px`);
      this.renderer.setStyle(tooltipElement, 'top', `${rect.top + window.scrollY - tooltipElement.offsetHeight}px`);
    }
  }

  // Fetch all contacts
  fetchAllBlogs() {
    this._blogService.onBlogGetAll().subscribe(res => {
      this.getData = res;
    });
  }

  editBlog(blog: any, content: any) {
    this.selectedBlog = { ...blog }; // Copy the blog data to selectedBlog
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onDelete(id: any) {
    this._blogService.onBlogDelete(id).subscribe(res => {
      console.log(res);
      this._blogService.onBlogGetAll().subscribe(res => {
        this.getData = res;
      });
    });
  }

  // Delete all contacts
  onDeleteAll() {
    this._blogService.onBlogDeleteAll().subscribe(res => {
      console.log('All Blogs deleted', res);
      this.fetchAllBlogs(); // Refresh the blog list after deleting all
    });
  }

  saveChanges(modal: any) {
    this._blogService.onBlogUpdate(this.selectedBlog._id, this.selectedBlog).subscribe(res => {
      this._blogService.onBlogGetAll().subscribe(res => {
        this.getData = res;
      });
      modal.close(); // Close the modal after saving
    });
  }

  handleFileInput(event: any) {
    this.selectedBlog.image = event.target.files[0]; // Capture the selected file
  }
}
