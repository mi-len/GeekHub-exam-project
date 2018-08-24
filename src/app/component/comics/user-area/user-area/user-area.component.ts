import { Component, OnInit } from '@angular/core';
import { ComicsService } from '../../../../services/comics.service';
import { Router } from '@angular/router';
// import { filter, map } from 'rxjs/operators'
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.css'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})
export class UserAreaComponent implements OnInit {
  comics
  index : number
  search_query 
  hasPublished : boolean

  constructor( private comicsService : ComicsService, private router : Router) { 
    this.index = 0
    this.search_query = `?query={"_acl.creator":"${localStorage.getItem('user_id')}"}`

  }
  ngOnInit() {
   this.comicsService.getUserItems(this.search_query).subscribe(data => {
      this.comics = data

      this.hasPublished = this.comics[0] !== undefined
    })
  }

  deleteArticle(id) {
    this.comicsService.deleteComics(id).subscribe()
    this.ngOnInit()
  }

}
