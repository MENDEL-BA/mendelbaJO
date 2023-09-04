import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetailComponent } from './detail/detail.component';

// Mise en place des routes (url)
const routes: Routes = [
  {
    path: '',
    component: HomeComponent, // rediriger automatiquement sur la page acceuil
  },
  {
    path: 'details/:name',
    component: DetailComponent,
  },
  {
    path: '**', // wildcard
    component: NotFoundComponent,// si url n'existe pas rediriger sur la page notfound
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
