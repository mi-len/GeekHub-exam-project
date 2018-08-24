import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { comicsComponents } from './index'
import { FormsModule } from '@angular/forms';
import { ComicsService } from '../../services/comics.service';
import { ListComicsComponent } from './list-comics/list-comics.component';
import { ComicsRoutingModule } from './comics-routing.module';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { CommaExpr } from '../../../../node_modules/@angular/compiler';
import { SearchResultComponent } from './search-result/search-result.component';
import { FavoritesComponent } from './user-area/favorites/favorites.component';

@NgModule({
  declarations: [
    ...comicsComponents,
    SearchResultComponent,
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ComicsRoutingModule,
  ],
  providers: [
    ComicsService
  ],
  exports: [
    ListComicsComponent
  ]
})
export class ComicsModule { }
