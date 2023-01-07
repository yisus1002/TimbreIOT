import { FormularioComponent } from './shared/formulario/formulario.component';
import { ContrasenaPipe } from './pipes/contrasena.pipe';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AvatarComponent } from './shared/avatar/avatar.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxPermissionsModule } from 'ngx-permissions';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { LOCALE_ID } from '@angular/core';
import { LoadingComponent } from './shared/loading/loading.component';

const lang = 'en-US';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    PerfilComponent,
    AvatarComponent,
    UsuariosComponent,
    ContrasenaPipe,
    FormularioComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxMaterialTimepickerModule.setLocale('ar-AE'),
    NgxPermissionsModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 2500,
      progressBar: true,

    }),
  ],
  providers: [{ provide: LOCALE_ID, useValue: lang }],
  bootstrap: [AppComponent]
})
export class AppModule { }
