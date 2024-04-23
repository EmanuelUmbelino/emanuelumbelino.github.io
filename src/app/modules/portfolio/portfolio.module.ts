import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './portfolio.component';
import { HomeComponent } from './components/home/home.component';
import { Routing } from './portfolio.routes';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PortfolioComponent,
    HomeComponent,
    AboutMeComponent,
    NavbarComponent,
    ContactComponent,
    ProjectsComponent,
  ],
  imports: [
    CommonModule,
    Routing,
    ReactiveFormsModule,
  ]
})
export class PortfolioModule { }
