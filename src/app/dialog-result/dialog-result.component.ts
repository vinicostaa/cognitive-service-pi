import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { RegisterService } from '../register/register.service';

@Component({
  selector: 'cog-dialog-result',
  templateUrl: './dialog-result.component.html',
  styleUrls: ['./dialog-result.component.css']
})
export class DialogResultComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogResultComponent>, 
    @Inject(MAT_DIALOG_DATA) data) {
      this.isSucess = data.sucess;
      this.msg = data.msg;
      this.title = data.title; 
      this.icon = data.icon;
    } 

  title: string;
  msg: string;
  isSucess: boolean;
  icon: string;

  ngOnInit() {
  
  }

  onCloseConfirm() {
    this.dialogRef.close();
  }

}
