import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  private urlApi = environment.url;
  private httpOptions;

  constructor(private http: HttpClient) { }

  setHeaders(){
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  GetTemperature(fechaInicio: string, fechaFinal: string, idDispositivo: string){
    this.setHeaders();
    return this.http.get(this.urlApi + 'temperatura/?fechaInicio='+fechaInicio+'&fechaFinal='+fechaFinal+'&idDispositivo='+idDispositivo, this.httpOptions).pipe() as any;
  }

  GetHumidity(fechaInicio: string, fechaFinal: string, idDispositivo: string){
    this.setHeaders();
    return this.http.get(this.urlApi + 'humedad/?fechaInicio='+fechaInicio+'&fechaFinal='+fechaFinal+'&idDispositivo='+idDispositivo, this.httpOptions).pipe() as any;
  }

  GetLed(id: number){
    this.setHeaders();
    return this.http.get(this.urlApi + 'led/' + id, this.httpOptions).pipe() as any;
  }

  SetLed(data: object, id: number){
    this.setHeaders();
    return this.http.post(this.urlApi + 'led/' + id, data, this.httpOptions).pipe() as any;
  }
}
