import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { ComicsService } from '../../../../services/comics.service';
import { ComicsModel } from '../../../../models/comics.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  model : ComicsModel;
  addingFailed : boolean;
  errMessage : string;
  publisher : string;
  pages : string[];
  page : string

  constructor(private comicsService : ComicsService, 
    private router : Router) {
      this.publisher = localStorage.getItem('username')
      this.model = new ComicsModel('', this.publisher, '', '', '', '', [])
   }

  ngOnInit() {
  }

  addComics() {
    this.addComics
        this.comicsService.addComics(this.model)
          .subscribe(
            data => {
              this.router.navigate(['/home'])
          }, 
          err => {
            this.addingFailed = true;
            this.errMessage = err['error']['description']
          })
  }

  pushPage(page : string) {
    console.log(page);
    this.model.pages.push(page) //--- ?
    // console.log(page);//---------------------------------
    this.page = ''
    
    
  }

// get_data(event) {
//     console.log(event.target.dataset.id)
//  }

  delThumbnail(event) {
    console.log(event.target.dataset.id);
    let id = event.target.dataset.id
    this.model.pages.splice(id, 1)
    
  }

}
