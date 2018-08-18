import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ComicsService } from '../../../../services/comics.service'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  comic
  pubisherName : string
  comicId : string;
  price 
  pages : string[]
  // img_url : string

  constructor( 
    private router : Router,
    private route : ActivatedRoute, 
    private comicsService : ComicsService ) {  
    this.comicId = this.route.snapshot.params['id']; 
  } 

  ngOnInit() {
    this.comicsService.getDetails(this.comicId).subscribe(data => {
      this.comic = data
      this.price = data['price']
      console.log(data);//------------------------------------------------------del
      
      this.pubisherName = data['publisher']
      this.pages = data['pages']

      if(this.pages) {
        this.pages.unshift(data['img_url'])
      }
    })
  }

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
  }

  viewImg(event) {
    // console.log(event.target.dataset.id)
    let ind = event.target.dataset.id;

    this.comic['img_url'] = this.pages[ind]
 }
  
}
