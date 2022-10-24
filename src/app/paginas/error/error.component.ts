import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { erroresMiddleware } from 'src/app/errores';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  public error:any = this.activatedRoute.snapshot.paramMap.get('error');
  public id:any = this.activatedRoute.snapshot.paramMap.get('id');

  errorDesc:any = '';

  constructor(private activatedRoute:ActivatedRoute, private http:HttpClient) { }

  ngOnInit(): void {
    this.errorDesc = erroresMiddleware[this.error].desc;
  }

  volver()
  {
      let sub = this.http.get(environment.apiUrl+'confirmar_pago/'+this.id, {headers: {'Access-Control-Allow-Origin':'http://localhost:4200'}}).subscribe((data:any) => {
        window.location.href = data.url;
        sub.unsubscribe();
      },
      (err) => {
        console.error(err);
        sub.unsubscribe();
      });
  }

}
