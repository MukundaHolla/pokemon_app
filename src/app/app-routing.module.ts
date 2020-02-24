import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'landing-page' },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'pokemon-details/:id', component: PokemonDetailsComponent },
  { path: '**', component: LandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
