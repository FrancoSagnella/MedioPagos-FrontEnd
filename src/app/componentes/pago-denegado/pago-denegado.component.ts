import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { erroresRechazoDecidir } from './../../errores';

@Component({
  selector: 'app-pago-denegado',
  templateUrl: './pago-denegado.component.html',
  styleUrls: ['./pago-denegado.component.scss']
})
export class PagoDenegadoComponent implements OnInit {

  @Input() idPago:any;
  @Input() idError:any;

  error:any = '';
  errorDesc:any = '';

  constructor(private router:Router, private http:HttpClient) { }

  ngOnInit(): void {
    if(this.idError != 0)
    {
      this.error = erroresRechazoDecidir[this.idError].descCorta;
      this.errorDesc = erroresRechazoDecidir[this.idError].desc;
    }
  }

  volverIntentar(){
    this.router.navigateByUrl('/principal/'+this.idPago);
  }

  cancelarPago(){
    // let sub = this.http.get('http://localhost:8080/api/pagos/cancelar_pago/'+this.idPago, {headers: {'Access-Control-Allow-Origin':'http://localhost:4200'}}).subscribe((data:any) => {
    let sub = this.http.get('https://medio-pagos.herokuapp.com/api/pagos/cancelar_pago/'+this.idPago, {headers: {'Access-Control-Allow-Origin':'http://localhost:4200'}}).subscribe((data:any) => {
      window.location.href = data.url;
      sub.unsubscribe();
    },
    (err) => {
      console.error(err);
      // Error del middleware (pago vencido o ya notificado)
      if(err.status == 409)
      {
        this.router.navigateByUrl('error/'+this.idPago+'/'+err.error.type);
      }
      sub.unsubscribe();
    });
  }
}
