import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { ComicsService } from '../../../../services/comics.service';
import { ComicsModel } from '../../../../models/comics.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  comic
  public comicId : string;

  model : ComicsModel;
  editFailed : boolean;
  errMessage : string;
  publisher : string;
  pages : string[];
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
    })
  }

  editCom() {
        this.comicsService.editComics(this.comicId, this.model)
          .subscribe(
            data => {
              this.router.navigate(['/home'])
              this.toastr.success('Item successfuly edited!', 'Success!')
          }, 
          err => {
            console.log(err);
            // this.editFailed = true;
            // this.errMessage = err['error']['description']
          })
  }

  pushPage(page : string) {
    console.log(page);
    this.model.pages.push(page) //--- ?
    // console.log(page);//---------------------------------
    this.page = ''
    
    
  }



 delThumbnail(event) {
   console.log(event.target.dataset.id);
   let id = event.target.dataset.id
   this.model.pages.splice(id, 1)
   
 }
}
