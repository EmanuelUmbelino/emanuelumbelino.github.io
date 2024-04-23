import { Component } from '@angular/core';
import { CalculateAge } from '@shared/helpers/calculate-age';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {

  birthDate = new Date('08/15/1998');

  currYear = new Date().getFullYear();

  calculateAge = CalculateAge;
}
