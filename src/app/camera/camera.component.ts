import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatSnackBar } from '../../../node_modules/@angular/material';
import { CameraService } from './camera.service';

@Component({
  selector: 'cog-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

  public captures: Array<any>;

  constructor(public dialog: MatDialog, private cameraService: CameraService, public snackBar: MatSnackBar) { 
    this.captures = [];
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit() {
  }

  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.nativeElement.src = window.URL.createObjectURL(stream);
        this.video.nativeElement.play();
      });
    }
  }

  public capture() {
    debugger;
    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.cameraService.addPhoto(this.canvas.nativeElement.toDataURL("image/png"));
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
    this.openSnackBar("Foto Capturada", "Fechar");
    this.dialog.closeAll();
  }

}
