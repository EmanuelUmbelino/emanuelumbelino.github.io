import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './portfolio.component';
import { HomeComponent } from './components/home/home.component';
import { Routing } from './portfolio.routes';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    PortfolioComponent,
    HomeComponent,
    AboutMeComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    Routing
  ]
})
export class PortfolioModule { }
