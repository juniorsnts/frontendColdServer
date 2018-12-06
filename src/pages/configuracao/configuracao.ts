import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ApiNodeProvider } from '../../providers/api-node/api-node';
import { Socket } from 'ng-socket-io';

@IonicPage()
@Component({
  selector: 'page-configuracao',
  templateUrl: 'configuracao.html',
})

export class ConfiguracaoPage {
  public backgroundColor: any;
  id; // pegar id por parametro
  modo: Boolean;

  constructor(
    private alert: AlertController,
    private toast: ToastController,
    private socket: Socket,
    private api: ApiNodeProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
      this.getStatus();
  }

  ionViewDidLoad() {
  }

  

  async getStatus(){ // metodo que observa alteracao de ligar/desligar
    this.socket.connect();
    await this.socket.on('status', data =>{
      console.log(data);
      this.modo = data;
      this.trocaCor(data);
    });
  }

  async statusSensor(modo){ //Envia true ou false para ligar ou desligar central
    await this.api.modoOnOff(this.id, modo).subscribe(res =>{
      console.log('Modo liga/Delsiga'+ res);
      if(res == 'true'){
        let toastCtrl = this.toast.create({
          message: 'Central Ligada',
          duration: 2000,
          position: 'bottom'
        });
        toastCtrl.present();
      } else if(res == 'false'){
        let toastCtrl = this.toast.create({
          message: 'Central Desligada',
          duration: 2000,
          position: 'bottom'
        });
        toastCtrl.present();
      } else {
        let alertCtrl = this.alert.create({
          subTitle: 'Erro na comunicao com a central',
          buttons: [{
            text: 'ok'
          }]
        });
        alertCtrl.present(); 
      }
    });    
  }

  trocaCor(status){
    if(status == true){
      this.backgroundColor = 'true';
    }    
    else {
      this.backgroundColor = 'false';
    }
  }

}
