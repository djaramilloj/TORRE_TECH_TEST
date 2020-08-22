import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListsRoutingModule } from './lists-routing.module';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { OpportunitiesListComponent } from './opportunities-list/opportunities-list.component';
import { FormsModule } from '@angular/forms';
import { OpportunitiesDetailsComponent } from './opportunities-details/opportunities-details.component';

@NgModule({
  declarations: [FriendsListComponent, OpportunitiesListComponent, OpportunitiesDetailsComponent],
  imports: [
    CommonModule,
    ListsRoutingModule,
    FormsModule
  ]
})
export class ListsModule { }
