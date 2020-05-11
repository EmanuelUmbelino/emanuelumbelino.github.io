import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NumerologiaComponent } from './numerologia/numerologia.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'numerologia', component: NumerologiaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
