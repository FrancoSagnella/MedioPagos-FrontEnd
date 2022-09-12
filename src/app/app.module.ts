import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './paginas/principal/principal.component';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { ResumenComponent } from './componentes/resumen/resumen.component';
import { FormDecidirComponent } from './componentes/form-decidir/form-decidir.component';
import { FormMercadoPagoComponent } from './componentes/form-mercado-pago/form-mercado-pago.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { FooterComponent } from './componentes/footer/footer.component';
import { ConfirmacionComponent } from './paginas/confirmacion/confirmacion.component';
import { PagoConfirmadoComponent } from './componentes/pago-confirmado/pago-confirmado.component';
import { PagoDenegadoComponent } from './componentes/pago-denegado/pago-denegado.component';
import { SieComponent } from './paginas/sie/sie.component'
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from './paginas/error/error.component';
import { SpinnerComponent } from './servicios/spinner/spinner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    NavBarComponent,
    ResumenComponent,
    FormDecidirComponent,
    FormMercadoPagoComponent,
    FooterComponent,
    ConfirmacionComponent,
    PagoConfirmadoComponent,
    PagoDenegadoComponent,
    SieComponent,
    ErrorComponent,
    SpinnerComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
