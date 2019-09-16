import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: 'conges', ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./pages/liste-conges/liste-conges.module').then(mod => mod.ListeCongesModule)
  },
  {
    path: 'types', ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./pages/liste-types/liste-types.module').then(mod => mod.ListeTypesModule)
  },
  {
    path: 'param', ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./pages/parametrage/parametrage.module').then(mod => mod.ParametrageModule)
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/conges', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
