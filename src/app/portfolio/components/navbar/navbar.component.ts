import { Component, Input } from '@angular/core';
import { Topic } from '../../models/topics.model';
import { IsActiveMatchOptions } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input() topics: Topic[] = [];

  sidebar = false;

  public linkActiveOptions: IsActiveMatchOptions = {
    matrixParams: 'exact',
    queryParams: 'exact',
    paths: 'exact',
    fragment: 'exact',
  };
}
