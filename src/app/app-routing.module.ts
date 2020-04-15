import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { canActivate, redirectUnauthorizedTo, AngularFireAuthGuard } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', redirectTo: '/conges', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'conges', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },
    loadChildren: () => import('./pages/liste-conges/liste-conges.module').then(mod => mod.ListeCongesModule)
  },
  {
    path: 'types', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },
    loadChildren: () => import('./pages/liste-types/liste-types.module').then(mod => mod.ListeTypesModule)
  },
  {
    path: 'param', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },
    loadChildren: () => import('./pages/parametrage/parametrage.module').then(mod => mod.ParametrageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
