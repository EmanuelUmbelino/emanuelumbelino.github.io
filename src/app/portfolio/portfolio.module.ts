import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './portfolio.component';
import { HomeComponent } from './home/home.component';
import { Routing } from './portfolio.routes';
import { AboutMeComponent } from './about-me/about-me.component';

@NgModule({
  declarations: [
    PortfolioComponent,
    HomeComponent,
    AboutMeComponent,
  ],
  imports: [
    CommonModule,
    Routing
  ]
})
export class PortfolioModule { }
