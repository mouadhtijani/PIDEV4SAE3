import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '',
    loadChildren: () => import('./frontoffice/frontoffice.module').then(m => m.FrontofficeModule)
  },
  { 
    path: 'admin',
    loadChildren: () => import('./backoffice/backoffice.module').then(m => m.BackofficeModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }