import { Component, OnInit } from '@angular/core';
import { ComicsService } from '../../../../services/comics.service'

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.css']
})
export class AdminAreaComponent implements OnInit {
  comics
  pageSize : number = 12;
  currentPage : number = 1;

  constructor( private comicsService : ComicsService ) { }

  ngOnInit() {
    this.comicsService.getAllComics().subscribe(data => this.comics = data)
  }

  deleteArticle(id) {
    this.comicsService.deleteComics(id).subscribe()
    this.ngOnInit()
  }

  changePage(page) {
    this.currentPage = page;
  }

}
