import { Component, OnInit } from '@angular/core';
import { ComicsService } from '../../../../services/comics.service';
import { Router } from '@angular/router';
// import { filter, map } from 'rxjs/operators'

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.css']
})
export class UserAreaComponent implements OnInit {
  comics
  index : number
  search_query 

  constructor( private comicsService : ComicsService, private router : Router) { 
    this.index = 0

    this.search_query = `?query={"_acl.creator":"${localStorage.getItem('user_id')}"}`

  }
  ngOnInit() {
   this.comicsService.getUserItems(this.search_query).subscribe(data => {
      this.comics = data
    })
    
    
  }

  deleteArticle(id) {
    this.comicsService.deleteComics(id).subscribe()
    this.ngOnInit()
  }

}
