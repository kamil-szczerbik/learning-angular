import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamsListComponent } from './teams-list/teams-list.component';
import { TeamComponent } from './team/team.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  {path: '', component: TeamsListComponent},
  {path: 'team/:id', component: TeamComponent },
  // {path: 'players', component: 'playersComponent'},
  // {path: 'player/:id', component: 'playerComponent'},
  {path: 'page-not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/page-not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
