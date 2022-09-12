import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { erroresDecidir } from 'src/app/errores';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-form-decidir',
  templateUrl: './form-decidir.component.html',
  styleUrls: ['./form-decidir.component.scss'],
})
export class FormDecidirComponent implements OnInit {
  anios: String[] = [];
  mediosPago: any[] = [];
  errorMessage:String = "";
  @Input() pago: any;

  medio_pago:any;
  card_number:String = '';
  card_expiration_month:any;
  card_expiration_year:any;
  security_code:any;
  card_holder_name:any;
  type:any = "dni";
  number:any;

  constructor(private http: HttpClient, private router: Router, private spinner:NgxSpinnerService) {}

  ngOnInit(): void {
    this.fillAnios();
    // this.fillMediosPago();
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

        //Si se confirma modal, se ejecuta el pago
        this.ejecutarPago();

      }
    })
  }

  ejecutarPago()
  {
    this.spinner.show();

    let body: any = {
      card_number: this.card_number,
      card_expiration_month: this.card_expiration_month,
      card_expiration_year: this.card_expiration_year,
      security_code: this.security_code,
      card_holder_name: this.card_holder_name,
      card_holder_identification: {
        type: this.type,
        number: this.number,
      },
      medio_pago: this.medio_pago,
    };

    let sub = this.http
      // .post('http://localhost:8080/api/pagos/decidir/token/' + this.pago.id, body,{ headers: { 'Content-Type': 'application/json' } })
      .post('https://medio-pagos.herokuapp.com/api/pagos/decidir/token/' + this.pago.id, body,{ headers: { 'Content-Type': 'application/json' } })
      .subscribe({
        // SI LA PETICION SE CONCRETA BIEN, Y EL PAGO SE HACE BIEN, ENTRA ACA Y PUEDE ESTAR APROBADO O RECHAZADO
        next: (data:any) => {

          if(data.status == 'approved')
          {
            this.router.navigateByUrl('confirmacion/aprobado/'+this.pago.id+'/0');
          }
          else if(data.status == 'rejected')
          {
            this.router.navigateByUrl('confirmacion/rechazado/'+this.pago.id+'/'+data.status_details.error.reason.id);
          }

          this.spinner.hide();
          sub.unsubscribe();

        },
        // SI LA PETICION TIRA ALGUN ERROR EN ALGUN MOMENTO, ENTRA ACA
        error: error => {

          // Error del middleware (pago vencido o ya notificado)
          if(error.status == 409)
          {
            this.router.navigateByUrl('error/'+this.pago.id+'/'+error.error.type);
          }

          let errorIndex = error.error.error_type + '-' + error.error.validation_errors[0].code + '-' + error.error.validation_errors[0].param;
          console.log(errorIndex);
          this.errorMessage = erroresDecidir[errorIndex].desc;

          this.spinner.hide();
          sub.unsubscribe();
        }

      });
  }

  cerrarError()
  {
    this.errorMessage = '';
  }

  fillAnios() {
    let date = new Date();
    for (let i = 0; i < 15; i++) {
      this.anios.push('' + (date.getFullYear() + i));
    }
  }
  fillMediosPago()
  {
    this.http.get('http://localhost:8080/api/pagos/decidir/payment-method/1')
    this.http.get('https://medio-pagos.herokuapp.com/api/pagos/decidir/payment-method/1')
      .subscribe((data:any) => {
        this.mediosPago = data;
      })
  }
}
