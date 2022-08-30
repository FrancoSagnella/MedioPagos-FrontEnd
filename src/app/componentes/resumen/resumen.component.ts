import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent implements OnInit {

  repetir:any[] = [{nombre:'Carta Documento', precio:1649, cantidad:3},
                  {nombre:'Telegrama Simple', precio:2099, cantidad:1}];
  @Input() productos:any[] = [];
  @Input() pago:any;
  @Input() consumidor:any;

  constructor() { }

  ngOnInit(): void {
  }

  getPrecioTotal()
  {
    let total = 0;
    this.repetir.forEach(element => {
      total+=(element.precio*element.cantidad);
    });
    return total;
  }
  getCantidadTotal()
  {
    let total = 0;
    this.productos.forEach(element => {
      total+=(element.cantidad);
    });
    return total;
  }
}
