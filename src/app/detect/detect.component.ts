import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CameraComponent } from '../camera/camera.component';
import { CameraService } from '../services/camera.service';
import { DetailComponent } from './detail/detail.component';
import { ApiService } from '../services/api.service';
import { Face } from '../model/Face';
import { Client } from '../model/client';
import { DialogResultComponent } from '../dialog-result/dialog-result.component';

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
    const dialogConfigCamera = new MatDialogConfig();
    dialogConfigCamera.data = {
      isCameraDetect: true
    }; 

    const dialogRef = this.dialog.open(CameraComponent, dialogConfigCamera);

    dialogRef.afterClosed().subscribe(async result => {
      this.isLoading = true;
      this.cameraService.contextDetect = this.cameraService.context[0];
      if (this.cameraService.contextDetect) {
        // chamar serviço para detectar 
        this.face = {
          base64image: this.cameraService.context,
          persistedFaceId: '',
          client: null
        };
        this.clients = await this.apiService.checkDetect(this.face);
        this.cameraService.contextDetect = undefined;
        this.cameraService.context = [];
      }
      this.isLoading = false;

      const dialogConfig = new MatDialogConfig();
      if (this.clients != null) {
        dialogConfig.data = {
          sucess: true,
          title: "Usuário encontrado",
          msg: "Usuário encontrado em nossa base de dados",
          icon: "done",
          screen: 'detect'
        };
      } else {
        dialogConfig.data = {
          sucess: false,
          title: "Usuário não encontrado",
          msg: "Usuário não encontrado em nossa base de dados",
          icon: "highlight_off",
          screen: 'detect'
        };
      }
      const dialogSucess = this.dialog.open(DialogResultComponent, dialogConfig);
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
