import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { ActivatedRoute, Router, Routes } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('750ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('750ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LandingComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  NavigateToDisplay() {
    this.router.navigate(['display']);
  }

  NavigateToInsert() {
    this.router.navigate(['insert']);
  }

  NavigateToFilehandle(){
    this.router.navigate(['filehandle']);
  }
  
  NavigateToBootstrapTest(){
    this.router.navigate(['bootstraping']);
  }
  onLogoutClick() {
    localStorage.removeItem('user');
    this.router.navigate(['/auth']);
  }

}
