import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'portfolio',
    loadChildren: () => import('./modules/portfolio/portfolio.module').then((m) => m.PortfolioModule),
  },
  { path: '', pathMatch: 'full', redirectTo: 'portfolio' },
];
