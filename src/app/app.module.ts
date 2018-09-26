import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatGridListModule, MatProgressSpinnerModule, MatDialogModule, MatAutocompleteModule, MatInputModule, MatStepperModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatSnackBarModule } from '@angular/material';
import { DetectComponent } from './detect/detect.component';
import { RegisterComponent } from './register/register.component';
import { ListClientsComponent } from './list-clients/list-clients.component';
import { CameraComponent } from './camera/camera.component';
import { CameraService } from './camera/camera.service';
import { DetailComponent } from './detect/detail/detail.component';
import { RegisterService } from './register/register.service';
import { HttpClientModule } from '@angular/common/http';
import { DialogResultComponent } from './dialog-result/dialog-result.component';

const appRoutes: Routes = [
  { path: '', component: DetectComponent },
  { path: 'detect', component: DetectComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'list-clients', component: ListClientsComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MyNavComponent,
    DetectComponent,
    RegisterComponent,
    ListClientsComponent,
    CameraComponent,
    DetailComponent,
    DialogResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatGridListModule
  ],
  entryComponents: [
    CameraComponent,
    DetailComponent,
    DialogResultComponent
  ],
  providers: [
    CameraService,
    RegisterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
