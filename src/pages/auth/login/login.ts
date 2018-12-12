import { ApiNodeProvider } from './../../../providers/api-node/api-node';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { TabsPage } from '../../tabs/tabs';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StorageProvider } from '../../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: any;

  constructor(
    private storage: StorageProvider,
    private splashScreen: SplashScreen,
    private api: ApiNodeProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController) {
      this.splashScreen.hide();
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])]
      });
  }

  async login(){
    let email = this.loginForm.controls.email.value;
    let senha = this.loginForm.controls.password.value;
    await this.api.auth('/login', email, senha).subscribe(res =>{  
      let data:any = res;
      if(data.estado == true){
        this.storage.setStorage('token', data.token).then(()=>{
          this.api.getToken().then(resp =>{
            if(resp == 'ok'){
              this.navCtrl.setRoot(TabsPage);
            }
          });
        })
      } else if(data.estado == false){
        console.log('Usuario nao cadastrado');
      }
    });
  }

  goToSignup(){
    this.navCtrl.push('SignupPage');
  }

}
