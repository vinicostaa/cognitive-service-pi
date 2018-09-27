import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CameraComponent } from '../camera/camera.component';
import { CameraService } from '../camera/camera.service';
import { DetailComponent } from './detail/detail.component';

@Component({
  selector: 'cog-detect',
  templateUrl: './detect.component.html',
  styleUrls: ['./detect.component.css']
})
export class DetectComponent implements OnInit {

  constructor(public dialog: MatDialog, private cameraService: CameraService) { }

  isLoading: boolean = false;

  openDialog() {
    const dialogRef = this.dialog.open(CameraComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.cameraService.contextDetect = this.cameraService.context;
      // chamar serviço para detectar 
      this.isLoading = true;
    });
  }

  openDialogDetail() {
    const dialogRef = this.dialog.open(DetailComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.cameraService.contextDetect = this.cameraService.context;
      if(this.cameraService.contextDetect){
        // chamar serviço para detectar 
        this.isLoading = true;
      }
    });
  }

  ngOnInit() {
  }

}
