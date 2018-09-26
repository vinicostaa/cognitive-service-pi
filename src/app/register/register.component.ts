import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import { CameraComponent } from '../camera/camera.component';
import { Client } from '../model/client';
import { CameraService } from '../camera/camera.service';
import { RegisterService } from './register.service';
import { DialogResultComponent } from '../dialog-result/dialog-result.component';

@Component({
  selector: 'cog-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog,
    private cameraService: CameraService, private registerService: RegisterService, public snackBar: MatSnackBar) {
  }

  isLinear = true;
  registerForm: FormGroup;
  secondFormGroup: FormGroup;
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/
  cpfPattern = /^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/
  isLoading: boolean = false;

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      rg: ['', Validators.required,],
      cpf: ['', [Validators.required, Validators.pattern(this.cpfPattern)]],
      telefone: ['', Validators.pattern(this.numberPattern)],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [this.cameraService.context, Validators.required]
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CameraComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.cameraService.contextAdd = this.cameraService.context;
      this.secondFormGroup.controls['secondCtrl'].setValue(this.cameraService.context.substring(0,10));
    });
  }

  openDialogResult() {
    const dialogRef = this.dialog.open(DialogResultComponent);

    dialogRef.afterClosed().subscribe(result => {
      //redirect
    });
  }

  public proxPhoto() {
    if(!this.cameraService.context) {
      this.openSnackBar("Adicione a foto para Prosseguir", "Fechar");
    }
  }

  public RgRegex(event: any){
    event.target.value=event.target.value.replace(/\D/g,""); //Substituí o que não é dígito por "", /g é [Global][1]
    event.target.value=event.target.value.replace(/(\d{1,2})(\d{3})(\d{3})(\d{1})$/,"$1.$2.$3-$4"); 
    return event.target.value
  }

  public cpfRegex(event: any) {
    event.target.value = event.target.value.replace(/\D/g, "");
    event.target.value = event.target.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4")
    return event.target.value;
  }

  checkRegister(client: Client) {
    this.isLoading = true;
    this.registerService.checkRegister(client).subscribe(client => 
      this.registerService.client = client );
    this.isLoading = false;
    this.openDialogResult();
  }

}