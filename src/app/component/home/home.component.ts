import { Component, OnInit } from '@angular/core';
import { ComicsService } from '../../services/comics.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private comicsService : ComicsService) { }

  ngOnInit() {
    
  }

  getAllComics() {
    this.comicsService.getAllComics().subscribe(data => console.log(data)
    )
  }

}
