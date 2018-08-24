import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service'
import { ComicsService } from '../../../services/comics.service';
import { iterateListLike } from '../../../../../node_modules/@angular/core/src/change_detection/change_detection_util';
// import { Comics } from '../../../models/comics.model'
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
  selector: 'app-list-comics',
  templateUrl: './list-comics.component.html',
  styleUrls: ['./list-comics.component.css'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'scale(0.8)' }),
            stagger(
              '90ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'scale(1)' })
              )
            )
          ]
        ),
      ])
    ])
  ]
})
export class ListComicsComponent implements OnInit {
  comics
  searchResult = []
  // search_query 
  noMatch : boolean

  constructor(private comicsService : ComicsService) {
    // this.search_query = `?query={"title":"Mighty Thor"}`
   }

  ngOnInit() {
    // this.comicsService.getAllComics().subscribe(data => this.comics = data)//---real
    this.comicsService.getAllComics().subscribe(data => {
      this.comics = data
    })
  }

  getSearch(qs) {
    if(!qs.search) {
      return
    }

    // this.comicsService.getSearch(this.search_query).subscribe(data => console.log(data)
    this.comicsService.getAllComics().subscribe(data => {
      this.noMatch = true;
      this.searchResult = []

      for (let key in data) {
        if (data[key]['title'].includes(`${qs.search}`)) {
          this.searchResult.push(data[key])

          this.noMatch = false;
        }
      }
    })

    if ( this.searchResult.length === 0 ) {
      this.noMatch = true
    }
  }
}
