import { Component, OnInit } from '@angular/core';
import { style, animate, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  animations: [
    trigger('img1', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0.7 }),
        animate('0.2s ease-in', 
          style({ transform: 'scale(1)', opacity: 1 }))
      ]),      
    ]),
    trigger('img2', [
      transition(':enter', [
        style({ transform: 'translateX(50px)', opacity: 0.7 }),
        animate('0.3s ease-in', 
          style({ transform: 'scale(1)', opacity: 1 }))
      ]),      
    ]),
    trigger('img3', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0.7 }),
        animate('0.4s ease-in', 
          style({ transform: 'scale(1)', opacity: 1 }))
      ]),      
    ])
  ]
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
