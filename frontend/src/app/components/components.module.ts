import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

import { ComponentsRoutingModule } from './components-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServiceComponent } from './service/service.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { TeamComponent } from './team/team.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ServiceComponent,
    PortfolioComponent,
    TeamComponent,
    BlogComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgxPaginationModule,
    ComponentsRoutingModule,
    ReactiveFormsModule // Include ReactiveFormsModule in imports array
  ]
})
export class ComponentsModule { }
