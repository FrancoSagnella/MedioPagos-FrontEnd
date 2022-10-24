import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

// import { HttpService } from 'src/app/servicios/http.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  mostrarForm:boolean = false;
  mostrarMercadoPago:boolean = false;
  id:any = this.activatedRoute.snapshot.paramMap.get('id');
  pago:any;
  consumidor:any;
  productos:any;

  constructor(private activatedRoute:ActivatedRoute, private http:HttpClient, private route:Router, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {

    this.spinner.show();

    //Si no trajo id en la url
    if(this.id === null)
    {
      this.route.navigateByUrl('error/0/url');
    }

    let sub = this.http.get(environment.apiUrl+this.id, {headers: {'Access-Control-Allow-Origin':'http://localhost:4200'}}).subscribe((data:any) => {
      console.log(data);
      this.pago = data.pago;
      this.consumidor = data.consumidor;
      this.productos = data.producto;

      this.spinner.hide();
      sub.unsubscribe();
    },
    (err) => {
      console.error(err);

      // // Error del middleware (pago vencido o ya notificado)
      if(err.status == 409)
      {
        this.route.navigateByUrl('error/'+this.id+'/'+err.error.type);
      }

      this.spinner.hide();
      sub.unsubscribe();
    });

  }

  elegirMedio(medio:string)
  {
    if(medio === 'decidir'){
      this.mostrarForm = true;
      this.mostrarMercadoPago = false;
    }
    else{
      this.mostrarForm = false;
      this.mostrarMercadoPago = true;
    }
  }

  cancelarPago(){

    //Modal para confirmar
    Swal.fire({
      title: '¿Seguro que quiere continuar?',
      text: 'Se cancelará el proceso del pago',
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#152663',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: 'rgb(183, 0, 0)',
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {

        this.spinner.show();

        //Si se confirma el modal, se cancela el pago
        let sub = this.http.get(environment.apiUrl+'cancelar_pago/'+this.id, {headers: {'Access-Control-Allow-Origin':'http://localhost:4200'}})
        .subscribe(
          {
            next: (data:any) => {
              console.log(data);
              window.location.href = data.url;

              this.spinner.hide();
              sub.unsubscribe();
            },

            error: err => {
              // Error del middleware (pago vencido o ya notificado)
              if(err.status == 409)
              {
                this.route.navigateByUrl('error/'+this.id+'/'+err.error.type);
              }

              this.spinner.hide();
              sub.unsubscribe();
            }
        })

      }
    })


  }
}
