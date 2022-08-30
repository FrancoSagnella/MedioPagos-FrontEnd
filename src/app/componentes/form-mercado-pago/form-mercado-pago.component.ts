import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var configBricks:any;

@Component({
  selector: 'app-form-mercado-pago',
  templateUrl: './form-mercado-pago.component.html',
  styleUrls: ['./form-mercado-pago.component.scss'],
})
export class FormMercadoPagoComponent implements OnInit {
  @Input() productos: any[] = [];
  @Input() pago: any;
  @Input() consumidor: any;

  constructor(private http: HttpClient, private route:Router) {}

  ngOnInit(): void {
    configBricks();
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
