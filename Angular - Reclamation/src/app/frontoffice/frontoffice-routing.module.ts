import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { ReclamationComponent } from './pages/reclamation/reclamation.component';

const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'reclamation', component: ReclamationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }