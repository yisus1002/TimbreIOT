import { PerfilComponent } from './pages/perfil/perfil.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AuthGuard } from './guards/auth.guard';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { RegistroComponent } from './pages/registro/registro.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data: { permissions: { only: ['ADMIN'], redirectTo: '/' } },
  },
  {
    path: 'registro',
    component: RegistroComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data: { permissions: { only: ['ADMIN'], redirectTo: '/' } },
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
