import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Topic } from './models/topics.model';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent implements AfterViewInit {
  @ViewChild('top') top!: ElementRef;
  @ViewChild('home') home!: ElementRef;
  @ViewChild('about') about!: ElementRef;
  @ViewChild('projects') projects!: ElementRef;
  @ViewChild('contact') contact!: ElementRef;

  topics: Topic[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.mapTopics();
    this.cd.detectChanges();

    this.route.fragment.subscribe((route) => {
      const topic = this.topics.find(topic => topic.name === route);
      if (topic) {
        this.scrollToTopic(topic.element);
      } else {
        this.scrollToTopic(this.top);
      }
    });
  }

  mapTopics() {
    this.topics = [
      new Topic('home', false, this.home),
      new Topic('about', true, this.about),
      new Topic('projects', true, this.projects),
      new Topic('contact', true, this.contact),
    ];
  }

  onScroll() {
    const currScroll = window.scrollY;

    const currTopic = this.topics.find(
      (topic) => currScroll >= topic.top && currScroll < topic.bottom
    );

    this.router.navigate([], {
      relativeTo: this.route,
      fragment: currTopic?.name ?? undefined,
    });
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
