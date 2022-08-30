import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmacionComponent } from './paginas/confirmacion/confirmacion.component';
import { ErrorComponent } from './paginas/error/error.component';
import { PrincipalComponent } from './paginas/principal/principal.component';
import { SieComponent } from './paginas/sie/sie.component';

const routes: Routes = [
  {path:'principal', component:PrincipalComponent},
  {path:'principal/:id', component:PrincipalComponent},
  {path:'confirmacion/:estado/:id/:error', component:ConfirmacionComponent},
  {path:'redirectSIE', component:SieComponent},
  {path:'error/:id/:error', component:ErrorComponent},
  {path:'**', redirectTo:'principal'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
