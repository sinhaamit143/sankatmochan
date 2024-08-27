import { Component, ViewChild } from '@angular/core';
import { NgbNavModule, NgbDropdownModule, NgbAlertModule, NgbTooltipModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    NgxPaginationModule
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NgbdnavBasicComponent {
  
  active2 = 'top';
  collection = [];
  p: number = 1; // current page number
  itemsPerPage: number = 4; // items per page

  selectedBlog: any = {}; // Store the selected blog data for editing
  getData: any;

  // ViewChild to get the reference to the confirmation modal template
  @ViewChild('confirmDeleteModal') confirmDeleteModal: any;
  private blogToDeleteId: string | null = null;  // Store the ID of the blog to be deleted

  constructor(
    private _blogService: BlogService, 
    private modalService: NgbModal
  ) {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }

  ngOnInit() {
    this.fetchAllBlogs();
  }

  // Fetch all blogs
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
    this.blogToDeleteId = id;  // Set the ID of the blog to be deleted
    const modalRef = this.modalService.open(this.confirmDeleteModal, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.result.then((result) => {
      if (result === 'Delete' && this.blogToDeleteId) {
        this._blogService.onBlogDelete(this.blogToDeleteId).subscribe(res => {
          console.log(res);
          this.fetchAllBlogs();
        });
      }
    });
  }

  confirmDelete(modal: any) {
    modal.close('Delete');  // Trigger the deletion action
  }

  // Delete all blogs
  onDeleteAll() {
    this._blogService.onBlogDeleteAll().subscribe(res => {
      console.log('All Blogs deleted', res);
      this.fetchAllBlogs(); // Refresh the blog list after deleting all
    });
  }

  saveChanges(modal: any) {
    this._blogService.onBlogUpdate(this.selectedBlog._id, this.selectedBlog).subscribe(res => {
      this.fetchAllBlogs(); // Refresh the blog list after saving changes
      modal.close(); // Close the modal after saving
    });
  }

  handleFileInput(event: any) {
    this.selectedBlog.image = event.target.files[0]; // Capture the selected file
  }
}
