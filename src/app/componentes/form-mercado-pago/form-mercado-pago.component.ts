import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var configBricks:any;
declare var unset:any;

@Component({
  selector: 'app-form-mercado-pago',
  templateUrl: './form-mercado-pago.component.html',
  styleUrls: ['./form-mercado-pago.component.scss'],
})
export class FormMercadoPagoComponent implements OnInit, OnDestroy {
  @Input() productos: any[] = [];
  @Input() pago: any;
  @Input() consumidor: any;
  // @Input() idPreferencia:any;

  constructor(private http: HttpClient, private route:Router) {}

  ngOnInit(): void {
    // console.log(this.idPreferencia);
    // configBricks(this.pago.id, this.pago.precioTotal, this.idPreferencia);
    configBricks(this.pago.id, this.pago.precioTotal);

  }

  ngOnDestroy(): void {
    unset();
  }

  pagar() {
    let body: any = {
      title: this.consumidor.nombre,
      description: null,
      pictureUrl: null,
      categoriId: null,
      quantity: 1,
      unitPrice: this.pago.precioTotal,
      currencyId: 'ARS',
    };
    // this.http.post('http://localhost:8080/api/pagos/MercadoPago/creates/'+this.pago.id, body, {headers:{"Content-Type":"application/json"}})
    this.http.post('https://medio-pagos.herokuapp.com/api/pagos/MercadoPago/creates/' + this.pago.id,body,{ headers: { 'Content-Type': 'application/json' } })
      .subscribe({

      next: (data: any) => {
        console.log(data.sandboxInitPoint);
        window.location.href = data.sandboxInitPoint;
      },

      error: err => {
        // Error del middleware (pago vencido o ya notificado)
        if(err.status == 409)
        {
          this.route.navigateByUrl('error/'+this.pago.id+'/'+err.error.type);
        }
      }
      });
  }
}
