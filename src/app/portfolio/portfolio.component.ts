import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent implements AfterViewInit {
  @ViewChild('home') home!: ElementRef;
  @ViewChild('about') about!: ElementRef;

  topics: { name: string, top: number, bottom: number }[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngAfterViewInit() {
    this.mapTopics();

    this.route.fragment.subscribe((route) => {
      switch (route) {
        case 'about':
          this.scrollToTopic(this.about);
          break;
        case 'home':
          this.scrollToTopic(this.home);
          break;
        default:
          break;
      }
    });
  }

  mapTopics() {
    const aux: { name: string, element: any }[]  = [
      { name: 'home', element: this.home.nativeElement },
      { name: 'about', element: this.about.nativeElement },
    ];

    this.topics = aux.map(topic => {
      const name: string = topic.name;
      const top: number = topic.element.offsetTop;
      const bottom: number = top + topic.element.offsetHeight;
      return { name, top, bottom };
    });
  }
  
  onScroll(ref: any) {
    const currScroll = ref.scrollTop;
    
    const currTopic = this.topics.find(topic => currScroll >= topic.top && currScroll < topic.bottom);

    this.router.navigate([], { relativeTo: this.route, fragment: currTopic?.name ?? '' })
  }

  scrollToTopic(ref: ElementRef) {
    if (ref.nativeElement.scrollIntoView) {
      ref.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }
}
