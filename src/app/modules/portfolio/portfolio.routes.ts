import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './portfolio.component';

export const routes: Routes = [
    {
        path: '',
        component: PortfolioComponent,
    }
];

export const Routing = RouterModule.forChild(routes);