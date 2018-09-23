import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material';
import { CameraComponent } from '../camera/camera.component';
import { Client } from '../model/client';
import { CameraService } from '../camera/camera.service';

@Component({
  selector: 'cog-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLinear = true;
  registerForm: FormGroup;
  secondFormGroup: FormGroup;
  contextImage: string;

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/
  cpfPattern = /^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/

  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog,
     private cameraService: CameraService) {
      
     }

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      rg: ['', Validators.required,],
      cpf: ['', [Validators.required, Validators.pattern(this.cpfPattern)]],
      telefone: ['', Validators.pattern(this.numberPattern)],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [this.cameraService.context, Validators.required]
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CameraComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public RgRegex(event: any){
    event.target.value=event.target.value.replace(/\D/g,""); //Substituí o que não é dígito por "", /g é [Global][1]
    event.target.value=event.target.value.replace(/(\d{1,2})(\d{3})(\d{3})(\d{1})$/,"$1.$2.$3-$4"); 
    // \d{1,2} = Separa 1 grupo de 1 ou 2 carac. (\d{3}) = Separa 1 grupo de 3 carac. (\d{1}) = Separa o grupo de 1 carac.
    // "$1.$2.$3-$4" = recupera os grupos e adiciona "." após cada.
    return event.target.value
  }

  public cpfRegex(event: any) {
    event.target.value = event.target.value.replace(/\D/g, "");
    event.target.value = event.target.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4")
    return event.target.value;
  }

  checkRegister(form: Client) {
    console.log(form)
  }

}