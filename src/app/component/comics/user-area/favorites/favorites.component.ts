import { Component, OnInit } from '@angular/core';
import { ComicsService } from '../../../../services/comics.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
// import { FavService } from '../../../../services/fav.service';
import { UserModel } from '../../../../models/user.model';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger,
  animateChild
} from '@angular/animations';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
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

export class FavoritesComponent implements OnInit {
  comics
  index : number
  search_query 
  userFav
  isFav : boolean
  myarray : object[]
  user
  hasPublished : boolean
  
  constructor( 
    private comicsService : ComicsService, 
    private authService : AuthService) { 
    this.index = 0
    this.userFav = new UserModel([]);//--------------------------

    this.search_query = `?query={"_acl.creator":"${localStorage.getItem('user_id')}"}`
    this.myarray = []  
  }

  ngOnInit() {
    this.comicsService.getUserItems(this.search_query).subscribe(data => {
       this.comics = data
 
       this.hasPublished = this.comics[0] !== undefined
     })
 
     this.authService.getFav().subscribe(data => {//----new
        this.userFav.fav.push(...data['fav'])
        this.user = data
        
        let fav = this.userFav.fav

        for (const key in fav) {
          if (fav.hasOwnProperty(key)) {
            const element = fav[key];
            this.myarray.push(element)
          }
        }
  
        if(this.myarray.length > 0) {
          this.isFav = true
        } else {
          this.isFav = false
        }
 
     })
   }
   
  unFav(event) {
    let id = event.target.dataset.id
    this.myarray.splice(id, 1)
    this.user.fav = this.myarray
    this.authService.remFav(this.user).subscribe(data => {
      // console.log('put-unFav resp: ', data);//--syob6tenie za uspeh
    })
  }

}
