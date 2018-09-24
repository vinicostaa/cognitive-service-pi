import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'cog-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  closeDialog(){
    debugger;
    this.dialog.closeAll();
  }

}
