import { Component, OnInit, Input } from '@angular/core';

// import { comic } from '../list-comics/list-comics.component'
// import { Comics } from '../../../models/comics.model';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css']
})
export class ComicComponent implements OnInit {
  @Input('comic') comic;
  @Input('id') id
  price

  constructor() { }

  ngOnInit() {
    this.price = this.comic['price']
  }

}
