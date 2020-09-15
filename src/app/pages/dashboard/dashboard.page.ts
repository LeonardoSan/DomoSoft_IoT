import { Component, OnInit } from '@angular/core';
import { multi } from './data';
import { SensorsService } from '../../services/sensors.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  stateLed: boolean = false;
  showSpinner: boolean = false;
  fechaInicio: string = '2020-07-01';
  fechaFinal: string = '2020-07-31';
  // idDispositivo: string = 'postman';
  idDispositivo: string = 'ESP8266_002_5C:CF:7F:43:72:52';
  idLed: number = 1;

  multi: any[];
  view: any[] = [700, 300];

  dataApi: any[];
  dataTemperature: any = {
    'name': 'Temperatura',
    'series': []
  };

  dataHumidity: any = {
    'name': 'Humedad',
    'series': []
  };

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Fecha';
  yAxisLabel: string = 'Valores';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private sensorService: SensorsService) {
    // this.dataApi = multi;
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit() {
    console.log('dashboard');
    console.log('dataApi ngOninit: ', this.dataApi);

    console.log('obtener temperatura');

    this.showSpinner = true;
    this.sensorService.GetTemperature(this.fechaInicio, this.fechaFinal, this.idDispositivo).subscribe(
      result => {

        console.log('temperatura', result);
        // for(let i = 0; i < result.length; i++) {
        //   this.dataTemperature['series'].push({
        //     'name': result[i]['Fecha'],
        //     'value': result[i]['Valor']
        //   });
        // }
        console.log('this.dataTemperature', this.dataTemperature);
        this.dataTemperature['series'] = result;

        this.sensorService.GetHumidity(this.fechaInicio, this.fechaFinal, this.idDispositivo).subscribe(
          result => {
            this.showSpinner = false;
            console.log('humedad', result);
            this.dataHumidity['series'] = result;

            this.dataApi = [
              this.dataTemperature,
              this.dataHumidity
            ];

            console.log('dataApi', this.dataApi);
          },
          error => {
            this.showSpinner = false;
            console.error(error);
          }
        );

        // this.dataApi = [
        //   this.dataTemperature
        // ]
        
      },
      error => {
        this.showSpinner = false;
        console.error(error);
      }
    );

    this.GetStateLed();
  }

  GetStateLed(){
    let id= this.idLed;
    let valor;
    this.showSpinner = true;
    this.sensorService.GetLed(id).subscribe(
      result => {
        this.showSpinner = false;
        console.log('OK Get Led ', result);
        console.log(result[0]['Valor']);

        if(result[0]['Valor'] == '0'){
          valor = '1';
          this.stateLed = false;
        }
        else{
          valor = '0';
          this.stateLed = true;
        }

      },
      error => {
        this.showSpinner = false;
        console.error('Error Get Led ', error);
      }
    );

  }

  validateDate(){
    console.log(this.fechaInicio);
    console.log(this.fechaFinal);
    this.readData();
  }

  readData(){
    this.showSpinner = true;
    this.sensorService.GetTemperature(this.fechaInicio, this.fechaFinal, this.idDispositivo).subscribe(
      result => {

        console.log('temperatura', result);
        // for(let i = 0; i < result.length; i++) {
        //   this.dataTemperature['series'].push({
        //     'name': result[i]['Fecha'],
        //     'value': result[i]['Valor']
        //   });
        // }
        console.log('this.dataTemperature', this.dataTemperature);
        this.dataTemperature['series'] = result;

        this.sensorService.GetHumidity(this.fechaInicio, this.fechaFinal, this.idDispositivo).subscribe(
          result => {
            this.showSpinner = false;
            console.log('humedad', result);
            this.dataHumidity['series'] = result;

            this.dataApi = [
              this.dataTemperature,
              this.dataHumidity
            ];

            console.log('dataApi', this.dataApi);
          },
          error => {
            this.showSpinner = false;
            console.error(error);
          }
        );

        // this.dataApi = [
        //   this.dataTemperature
        // ]
        
      },
      error => {
        this.showSpinner = false;
        console.error(error);
      }
    );
  }

  changeStateLed(){
    console.log('cambiar estado');
    

    let id= this.idLed;
    let valor;
    this.showSpinner = true;
    this.sensorService.GetLed(id).subscribe(
      result => {
        console.log('OK Get Led ', result);
        console.log(result[0]['Valor']);

        if(result[0]['Valor'] == '0'){
          valor = '1';
          this.stateLed = false;
        }
        else{
          valor = '0';
          this.stateLed = true;
        }

        let data = {
          'Valor': valor,
          'Lugar': 'prueba postman',
          'Id_Dispositivo': this.idDispositivo,
          'Red': 'RedBull',
          'Ip': '192.168.0.1',
          'Key': 'tPmAT5Ab3j7F8456'
        };

        this.sensorService.SetLed(data, id).subscribe(
          result => {
            this.showSpinner = false;
            console.log('OK Set Led ', result);
            this.stateLed = !this.stateLed;
          },
          error => {
            this.showSpinner = false;
            console.error('Error Set Led ', error);
          }
        );

      },
      error => {
        this.showSpinner = false;
        console.error('Error Get Led ', error);
      }
    );
  }

}
