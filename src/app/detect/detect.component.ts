import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CameraComponent } from '../camera/camera.component';
import { CameraService } from '../camera/camera.service';

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

  ngOnInit() {
  }

}
