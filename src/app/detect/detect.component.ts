import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CameraComponent } from '../camera/camera.component';
import { CameraService } from '../services/camera.service';
import { DetailComponent } from './detail/detail.component';
import { ApiService } from '../services/api.service';
import { Face } from '../model/Face';
import { Client } from '../model/client';

@Component({
  selector: 'cog-detect',
  templateUrl: './detect.component.html',
  styleUrls: ['./detect.component.css']
})
export class DetectComponent implements OnInit {

  constructor(public dialog: MatDialog, private cameraService: CameraService,
    private apiService: ApiService) { }

  isLoading: boolean = false;
  face: Face;
  faces: Face[] = [];
  clients: Client[] = [];

  openDialog() {
    const dialogRef = this.dialog.open(CameraComponent);

    dialogRef.afterClosed().subscribe(async result => {
      debugger
      this.isLoading = true;
      this.cameraService.contextDetect = this.cameraService.context;
      if (this.cameraService.contextDetect) {
        // chamar serviço para detectar 
        this.face = {
          base64image: this.cameraService.contextDetect,
          persistedFaceId: '',
          client: null
        }
        this.clients = await this.apiService.checkDetect(this.face);
        this.cameraService.contextDetect = undefined;
       
      }
      this.isLoading = false;
    });
  }

  openDialogDetail() {
    const dialogRef = this.dialog.open(DetailComponent);

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  ngOnInit() {
  }

}
