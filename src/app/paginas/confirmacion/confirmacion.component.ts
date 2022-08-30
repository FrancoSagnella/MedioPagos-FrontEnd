import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})
export class ConfirmacionComponent implements OnInit {

  // public estado:string = 'confirmado';
  public estado:any = this.activatedRoute.snapshot.paramMap.get('estado');
  public id:any = this.activatedRoute.snapshot.paramMap.get('id');
  public error:any = this.activatedRoute.snapshot.paramMap.get('error');

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }

}
