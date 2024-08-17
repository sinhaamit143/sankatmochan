import { Component, ElementRef, OnInit, AfterViewInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ContactService } from '../services/contact/contact.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {

  viewModel: boolean = false;

  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: Document,
    private contactForm: ContactService
  ) {
    //
    if (this.viewModel) {
      this.disablePageInteraction();
    }
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void { }

  accept(): void {
    this.contactForm.setAgreed(true);
    this.viewModel = false;
    this.enablePageInteraction();
  }

  disablePageInteraction(): void {
    this.document.body.style.overflow = 'hidden';
    this.document.documentElement.style.overflow = 'hidden';
  }

  enablePageInteraction(): void {
    this.document.body.style.overflow = 'auto';
    this.document.documentElement.style.overflow = 'auto';
  }
}
