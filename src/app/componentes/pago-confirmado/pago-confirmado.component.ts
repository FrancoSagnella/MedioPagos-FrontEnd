import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pago-confirmado',
  templateUrl: './pago-confirmado.component.html',
  styleUrls: ['./pago-confirmado.component.scss']
})
export class PagoConfirmadoComponent implements OnInit {

  constructor(private http:HttpClient) { }

  @Input() idPago:any;

  ngOnInit(): void {
  }

  confirmarPago()
  {
      let sub = this.http.get(environment.apiUrl+'confirmar_pago/'+this.idPago, {headers: {'Access-Control-Allow-Origin':'http://localhost:4200'}}).subscribe((data:any) => {
        window.location.href = data.url;
        sub.unsubscribe();
      },
      (err) => {
        console.error(err);
        sub.unsubscribe();
      });
  }
}
