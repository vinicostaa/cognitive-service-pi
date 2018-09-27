import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { CameraComponent } from '../camera/camera.component';
import { Client } from '../model/client';
import { CameraService } from '../camera/camera.service';
import { RegisterService } from './register.service';
import { DialogResultComponent } from '../dialog-result/dialog-result.component';
import { Router } from '@angular/router';

@Component({
  selector: 'cog-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private _formBuilder: FormBuilder, public dialog: MatDialog,
    private cameraService: CameraService, private registerService: RegisterService, public snackBar: MatSnackBar) {
  }

  isLinear = true;
  registerForm: FormGroup;
  secondFormGroup: FormGroup;
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  cpfPattern = /^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/
  isLoading: boolean = false;

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      rg: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(this.cpfPattern)]],
      telefone: ['', Validators.required],
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
      this.secondFormGroup.controls['secondCtrl'].setValue(this.cameraService.context.substring(0, 10));
    });
  }

  openDialogResult(isSucess: boolean) {
    const dialogConfig = new MatDialogConfig();
    if (isSucess) {
      dialogConfig.data = {
        sucess: true,
        title: "Cadastro Realizado com sucesso",
        msg: "Agora você já pode detectar o cliente cadastrado!",
        icon: "done"
      };
    } else {
      dialogConfig.data = {
        sucess: false,
        title: "Opss, Ocorreu um erro",
        msg: "Não foi possível realizar o cadastro!",
        icon: "highlight_off"
      };
    }

    const dialogRef = this.dialog.open(DialogResultComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(sucess => {
      if (isSucess)
        this.router.navigate(['/detect']);
    });
  }

  public proxPhoto() {
    if (!this.cameraService.context) {
      this.openSnackBar("Adicione a foto para Prosseguir", "Fechar");
    }
  }

  public maskTelefone(event: any) {

    event.target.value = event.target.value.replace('(', '')
      .replace(')', '')
      .replace('-', '')
      .replace('_', '')
      .replace(' ', '');

    if (event.target.value.length === 10)
      event.target.value = event.target.value.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
    else if (event.target.value.length > 10)
      event.target.value = event.target.value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');

    return event.target.value;
  }

  public RgRegex(event: any) {
    event.target.value = event.target.value.replace(/\D/g, ""); //Substituí o que não é dígito por "", /g é [Global][1]
    event.target.value = event.target.value.replace(/(\d{1,2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4");
    return event.target.value
  }

  public cpfRegex(event: any) {
    event.target.value = event.target.value.replace(/\D/g, "");
    event.target.value = event.target.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4")
    return event.target.value;
  }

  async checkRegister(client: Client) {
    debugger
    this.isLoading = true;
    const result = await this.registerService.checkRegister(client);
    this.isLoading = false;

    if (result) {
      this.openDialogResult(true);
    } else {
      this.openDialogResult(false);
    }
  }

}