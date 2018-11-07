import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Inject } from '@angular/core';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '../../../node_modules/@angular/material';
import { CameraService } from '../services/camera.service';

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

  constructor(public dialog: MatDialog, 
    private cameraService: CameraService, public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CameraComponent>, 
    @Inject(MAT_DIALOG_DATA) data) {
    
    this.captures = [];
    this.isCameraDetect = data.isCameraDetect;
  }

  isCameraDetect = false;

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
    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.cameraService.addPhoto(this.canvas.nativeElement.toDataURL("image/png"));
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
    this.openSnackBar("Foto Capturada", "Fechar");
    if (this.cameraService.context.length === 4) {
      this.openSnackBar("4 Fotos Capturada com sucesso", "Fechar");
      this.dialog.closeAll();
    }
    if(this.isCameraDetect) {
      this.dialog.closeAll();
    }
  }

}
