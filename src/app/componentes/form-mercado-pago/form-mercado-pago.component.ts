import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

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

  public funcion = () => {
    return 'hola';
  }

  constructor(private http: HttpClient, private route:Router, private spinner:NgxSpinnerService) {
    console.log(this.funcion());
  }

  ngOnInit(): void {
    // configBricks();
  }

  pagar() {

    //Modal para confirmar
    Swal.fire({
      title: '¿Seguro que quiere continuar?',
      text: 'Una vez efectuado el pago, no se realizarán reembolsos',
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#152663',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: 'rgb(183, 0, 0)',
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {

        //Si se confirma el modal, se ejecuta el pago
        this.ejecutarPago();

      }
    })


  }

  ejecutarPago()
  {
    this.spinner.show();

    let body: any = {
      title: this.consumidor.nombre,
      description: null,
      pictureUrl: null,
      categoriId: null,
      quantity: 1,
      unitPrice: this.pago.precioTotal,
      currencyId: 'ARS',
    };
    // let sub = this.http.post('http://localhost:8080/api/pagos/MercadoPago/creates/'+this.pago.id, body, {headers:{"Content-Type":"application/json"}})
    let sub = this.http.post('https://medio-pagos.herokuapp.com/api/pagos/MercadoPago/creates/' + this.pago.id,body,{ headers: { 'Content-Type': 'application/json' } })
      .subscribe({

      next: (data: any) => {
        // console.log(data);
        configBricks(data.id); // PARA QUE FUNCIONE CON MODAL
        // window.location.href = data.sandboxInitPoint; // PARA QUE FUNCIONE REDIRIGIENDO

        this.spinner.hide();
        sub.unsubscribe();
      },

      error: err => {
        // Error del middleware (pago vencido o ya notificado)
        if(err.status == 409)
        {
          this.route.navigateByUrl('error/'+this.pago.id+'/'+err.error.type);
        }

        this.spinner.hide();
        sub.unsubscribe();
      }
      });

  }
}
