import { ApiNodeProvider } from './../../providers/api-node/api-node';
import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import chart from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  nomesCentrais = [];

  @ViewChild('lineCanvas') lineCanvas;

  constructor(
    private api: ApiNodeProvider,
    public navCtrl: NavController) { 
      this.botoesCentrais();       
  }

  ionViewWillLeave(){
    console.log("Enviar parametros");
  }

  ionViewDidLoad(){    
  }

  ngAfterViewInit() {
    console.log("afterinit");
    setTimeout(() => {
      this.getChartLine();
    }, 1000);
  }

  async botoesCentrais(){
    await this.api.botoes('/botoesCentrais').subscribe(res=>{
      let centrais: any = res;
      for(let i=0; i<centrais.length; i++){
        this.nomesCentrais[i] = centrais[i];
      }
    });
  }

  getChart(context, type, data, options){
    return new chart(context, {
      type: type,
      data: data,
      options: options
    });    
  }

  getChartLine(){
    const data = {
      labels: ["Teste1", "Teste2", "Teste3", "Teste4"], //horas desligadas
      datasets: [{
        label: 'Consumo',
        data: [{
          x: new Date(),
          y: 1
        }, {
          t: new Date(),
          y: 10
        }], //horas ligadas
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

  centralSelect(nome){
    this.api.selecionaCentral(nome.id_central).subscribe(res=>{
      console.log(res);
    });
  }

  logout(){
    this.navCtrl.setRoot('LoginPage');
  }
  

}
