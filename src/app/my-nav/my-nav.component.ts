import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'cog-my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css']
})
export class MyNavComponent implements OnInit {


  constructor(private breakpointObserver: BreakpointObserver, private router: Router) { }

  ngOnInit(): void {
    // this.clicked = this.router.url === '/detect'
  }

  clicked: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  onClickItemMenu() {
    console.log(this.clicked)
    if (this.clicked)
      this.clicked = false;
    else
      this.clicked = true;
  }

}
