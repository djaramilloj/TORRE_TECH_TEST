import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FriendsListComponent } from './friends-list/friends-list.component';
import { OpportunitiesListComponent } from './opportunities-list/opportunities-list.component';
import { OpportunitiesDetailsComponent } from './opportunities-details/opportunities-details.component';


const routes: Routes = [
  {
    path: 'friends',
    component: FriendsListComponent
  },
  {
    path: 'opportunities',
    component: OpportunitiesListComponent
  },
  {
    path: 'opportunities/:id',
    component: OpportunitiesDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListsRoutingModule { }
