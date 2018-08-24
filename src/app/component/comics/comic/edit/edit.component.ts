import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { ComicsService } from '../../../../services/comics.service';
import { ComicsModel } from '../../../../models/comics.model';
import { ToastrService } from 'ngx-toastr';

import { style, animate, animateChild, transition, trigger, query as q, stagger } from '@angular/animations';
const query = (s,a,o={optional:true})=>q(s,a,o);

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  animations: [
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
    trigger('cover', [
      transition(':enter', [
        style({ transform: 'scale(0.9)', opacity: 0.7 }),
        animate('0.3s ease-in', 
          style({ transform: 'scale(1)', opacity: 1 }))
      ]),      
    ])
  ]
})
export class EditComponent implements OnInit {
  comic
  public comicId : string;
  model : ComicsModel;
  publisher : string;
  page : string;

  constructor(
    private comicsService : ComicsService, 
    private router : Router, 
    private route : ActivatedRoute,
    private toastr : ToastrService) {
      this.comicId = this.route.snapshot.params['id'];
      this.publisher = localStorage.getItem('username')
   }

  ngOnInit() {
    this.comicsService.getDetails(this.comicId).subscribe(data => {
      this.comic = data
      this.model = this.comic

      if (!this.model['pages']) {
        this.model['pages'] = []
      }
    })
  }

  editCom() {
    this.comicsService.editComics(this.comicId, this.model)
      .subscribe(
        data => {
          this.router.navigate(['/home'])
          this.toastr.success('Item successfuly edited!', 'Success!')
      })
  }

  pushPage(page : string) {
    this.model.pages.push(page) //--- ?
    this.page = ''
  }

  delThumbnail(event) {
    console.log(event.target.dataset.id);
    let id = event.target.dataset.id
    this.model.pages.splice(id, 1)
  }
}
