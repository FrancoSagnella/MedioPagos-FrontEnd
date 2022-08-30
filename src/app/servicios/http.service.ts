import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  public get(url:string, id:any)
  {
    let ret:any;
    let sub = this.http.get(url).subscribe((data) => {
      console.log('data recibida', data);
      ret = data;
      sub.unsubscribe();
    },
    (err) => {
      console.error(err);
    });
  }
}
