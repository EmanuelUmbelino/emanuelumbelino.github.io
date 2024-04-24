import { Component } from '@angular/core';
import { WorkExperience } from '@modules/portfolio/models/work-experience.model';
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

  workExperience: WorkExperience[] = [
    {
      company: 'VONEX',
      position: 'Senior Front End Developer',
      tecnology: 'Angular 16',
      startDate: new Date(2022,8),
    },
    {
      company: 'PUC-Rio',
      position: 'Front End Developer',
      tecnology: 'Angular 8 / 14',
      startDate: new Date(2019,11),
    },
    {
      company: 'FIOCRUZ',
      position: 'Application Developer',
      tecnology: 'Vue.js',
      startDate: new Date(2018,9),
      endDate: new Date(2019,11),
    },
    {
      company: 'IBM',
      position: 'Research Intern',
      tecnology: 'Angular 6',
      startDate: new Date(2018,9),
      endDate: new Date(2019,10),
    },
  ];
}
