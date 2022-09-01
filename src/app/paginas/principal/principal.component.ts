import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  idPreferencia:any;

  constructor(private activatedRoute:ActivatedRoute, private http:HttpClient, private route:Router) { }

  ngOnInit(): void {
    //Si no trajo id en la url
    if(this.id === null)
    {
      this.route.navigateByUrl('error/0/url');
    }


    let sub = this.http.get('http://localhost:8080/api/pagos/'+this.id, {headers: {'Access-Control-Allow-Origin':'http://localhost:4200'}}).subscribe((data:any) => {
    // let sub = this.http.get('https://medio-pagos.herokuapp.com/api/pagos/'+this.id, {headers: {'Access-Control-Allow-Origin':'http://localhost:4200'}}).subscribe((data:any) => {
      console.log(data);
      this.pago = data.pago;
      this.consumidor = data.consumidor;
      this.productos = data.producto;

      // this.crearPreferencia();

      sub.unsubscribe();
    },
    (err) => {
      console.error(err);

      // // Error del middleware (pago vencido o ya notificado)
      if(err.status == 409)
      {
        this.route.navigateByUrl('error/'+this.id+'/'+err.error.type);
      }

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
    let sub = this.http.get('http://localhost:8080/api/pagos/cancelar_pago/'+this.id, {headers: {'Access-Control-Allow-Origin':'http://localhost:4200'}})
    // let sub = this.http.get('https://medio-pagos.herokuapp.com/api/pagos/cancelar_pago/'+this.id, {headers: {'Access-Control-Allow-Origin':'http://localhost:4200'}})
    .subscribe(
      {
        next: (data:any) => {
          console.log(data);
          window.location.href = data.url;
          sub.unsubscribe();
        },

        error: err => {
          // Error del middleware (pago vencido o ya notificado)
          if(err.status == 409)
          {
            this.route.navigateByUrl('error/'+this.id+'/'+err.error.type);
          }
        }
    })
  }

  crearPreferencia()
  {
    let body: any = {
      title: this.consumidor.nombre,
      description: null,
      pictureUrl: null,
      categoriId: null,
      quantity: 1,
      unitPrice: this.pago.precioTotal,
      currencyId: 'ARS',
    };
    this.http.post('http://localhost:8080/api/pagos/MercadoPago/creates/'+this.pago.id, body, {headers:{"Content-Type":"application/json"}})
    // this.http.post('https://medio-pagos.herokuapp.com/api/pagos/MercadoPago/creates/' + this.pago.id,body,{ headers: { 'Content-Type': 'application/json' } })
      .subscribe({

      next: (data: any) => {
        console.log(data);
        this.idPreferencia = data.id;
        // window.location.href = data.sandboxInitPoint;
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
