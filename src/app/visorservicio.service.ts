import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VisorservicioService {
  url = "https://localhost:7060/api/ConsultasBasicas/";

  constructor(private http: HttpClient) { }
  getConsultarPredio(): Observable<any> {
    return this.http.get<any>(`${this.url}consultarPredio`);
  }
  getConsultarSuscriptor(): Observable<any> {
    return this.http.get<any>(`${this.url}ConsultarSuscriptores`);
  }
  
}
