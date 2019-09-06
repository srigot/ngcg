import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'conges', loadChildren: () => import('./pages/liste-conges/liste-conges.module').then(mod => mod.ListeCongesModule) },
  { path: 'types', loadChildren: () => import('./pages/liste-types/liste-types.module').then(mod => mod.ListeTypesModule) },
  { path: '', redirectTo: '/conges', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
