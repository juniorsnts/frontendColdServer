import { ApiNodeProvider } from './../../providers/api-node/api-node';
import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, App } from 'ionic-angular';
import chart from 'chart.js';
import { StorageProvider } from '../../providers/storage/storage';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lineChart: any;
  nomesCentrais = [];
  consumo = [];
  mesAno = [];

  @ViewChild('lineCanvas') lineCanvas;

  constructor(
    private storage: StorageProvider,
    private app: App,
    private api: ApiNodeProvider,
    public navCtrl: NavController) { 
      this.botoesCentrais();
  }

  ionViewWillLeave(){
  }

  ionViewDidLoad(){    
  }

  ngAfterViewInit() {
    console.log("afterinit");
    setTimeout(() => {
      //this.getChartLine();
    }, 1000);
  }

  async botoesCentrais(){
    await this.api.botoes('/botoesCentrais').subscribe(res=>{
      let centrais: any = res;
      for(let i=0; i<centrais.length; i++){
        this.nomesCentrais[i] = centrais[i];
      }
      this.centralSelect(this.nomesCentrais[0]);
    });
  }

  getChart(context, type, data, options){
    return new chart(context, {
      type: type,
      data: data,
      options: options
    });    
  }

  getChartLine(consumo, mesano){
    const data = {
      labels: mesano, //horas desligadas
      datasets: [{
        label: 'Consumo',
        data: consumo,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ]
      }],
      fill: true,
      lineTension: 0.1,
      borderColor: 'rgb(0,178,255)',
      borderCapStyle: 'butt',
      borderJoinStyle: 'miter',
      pointRadius: 1,
      pointHitRadius: 10,
    }

    const options = {
      animation: {
        duration: 0,
      },
      hover: {
        animationDuration: 0
      },
      responsiveAnimationDuration: 0
    }

    return this.getChart(this.lineCanvas.nativeElement, 'line', data, options);
  }

  async centralSelect(nome){
    await this.api.selecionaCentral(nome.id_central).subscribe(res=>{   
      let dados:any = res;
      for(let i=0; i<dados.length; i++){
          this.consumo.push(dados[i].consumo);
          this.mesAno.push(dados[i].mesAno);
      }
      this.lineChart = this.getChartLine(this.consumo, this.mesAno);
    });
  }

  logout(){
    this.storage.removeStorage('token');
    this.navCtrl.setRoot('LoginPage');
    this.app.getRootNav().setRoot('LoginPage');    
  }

}
