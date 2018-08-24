import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ComicsService } from '../../../../services/comics.service'
import { AuthService } from '../../../../services/auth.service';
import { UserModel } from '../../../../models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  comic
  pubisherName : string
  comicId : string;
  pages : string[]
  userFav : UserModel
  favBtnIsDisable : boolean
  favBtnMessage : string

  constructor( 
    private router : Router,
    private route : ActivatedRoute, 
    private comicsService : ComicsService,
    private authService : AuthService,
    private toastr : ToastrService  ) {  
    this.comicId = this.route.snapshot.params['id']; 
    this.userFav = new UserModel([]);
    this.favBtnMessage = 'Add to Favorites'
  } 

  ngOnInit() {
    this.comicsService.getDetails(this.comicId).subscribe(data => {
      this.comic = data
      this.pubisherName = data['publisher']
      this.pages = data['pages']

      if(this.pages) {
        this.pages.unshift(data['img_url'])
      }
    }, () => {},
    () => {
      this.authService.getFav().subscribe(data1 => {
        this.userFav.fav.push(...data1['fav'])

        for (const f of this.userFav.fav) {
          
          if(this.comic._id === f['_id']) {// check if already faved
            this.favBtnIsDisable = true
            this.favBtnMessage = 'Added to Favorites'
            return
          } else {
            this.favBtnMessage = 'Add to Favorites'
          }
        }
      })
    }
  )}

  isOwner() {
      if( this.pubisherName === localStorage.getItem('username') ) {
        return true
      } else {
        return false
      }
  }

  deleteCo() {
    this.comicsService.deleteComics(this.comicId).subscribe()
    this.router.navigate(['/home'])
    this.toastr.success('Delete successful!', 'Success!')
  }

  viewImg(event) {
    let ind = event.target.dataset.id;
    this.comic['img_url'] = this.pages[ind]
  }

  addFav(item) {

    this.favBtnIsDisable = true
    this.favBtnMessage = 'Added to Favorites'
    
    this.authService.pushFav(item, this.userFav).subscribe(data => {
      //something -- message for success
    })
  }
      
}
