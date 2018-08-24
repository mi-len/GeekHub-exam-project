import { Component, OnInit } from '@angular/core';
import { style, animate, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
  animations: [
    trigger('form', [
      transition(':enter', [
        style({ transform: 'translateY(-50px)', opacity: 0 }),
        animate('5s ease-in-out', 
          style({ transform: 'translateY(0)', opacity: 1 }))
      ]),      
    ])
  ]
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
