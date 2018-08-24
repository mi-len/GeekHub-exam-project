import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { ComicsService } from '../../../../services/comics.service';
import { ComicsModel } from '../../../../models/comics.model';
import { style, animate, animation, animateChild, useAnimation, group, sequence, transition, state, trigger, query as q, stagger } from '@angular/animations';
const query = (s,a,o={optional:true})=>q(s,a,o);

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  animations: [
    trigger('form', [
      transition(':enter', [
        style({ transform: 'translateY(-50px)', opacity: 0.1 }),
        animate('0.5s ease-out', 
          style({ transform: 'translateY(0)', opacity: 1 }))
      ]),      
    ]),
    trigger('list', [
      transition(':enter', [
        // child animation selector + stagger
        query('@items', 
          stagger(100, animateChild())
        )
      ]),
    ]),
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('1s cubic-bezier(.8,-0.6,0.2,1.5)', 
          style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('1s cubic-bezier(.8,-0.6,0.2,1.5)', 
          style({ transform: 'scale(0.5)', opacity: 0, height: '0px', margin: '0px' }))
      ]),      
    ]),
  ]
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

  ngOnInit() { }

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
    this.model.pages.push(page) 
    this.page = ''
  }

  delThumbnail(event) {
    console.log(event.target.dataset.id);
    let id = event.target.dataset.id
    this.model.pages.splice(id, 1)
  }

}
