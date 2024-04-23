import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent implements AfterViewInit {
  @ViewChild('home') home!: ElementRef;
  @ViewChild('about') about!: ElementRef;

  constructor(private router: ActivatedRoute) {}

  ngAfterViewInit() {
    this.router.fragment.subscribe((route) => {
      switch (route) {
        case 'about':
          this.scroll(this.about);
          break;
        case 'home':
          this.scroll(this.home);
          break;
        default:
          break;
      }
    });
  }

  scroll(ref?: ElementRef) {
    if (ref?.nativeElement?.scrollIntoView) {
      ref.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }
}
