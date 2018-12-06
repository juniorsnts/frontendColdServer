import { ApiNodeProvider } from './../../../providers/api-node/api-node';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { TabsPage } from '../../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: any;

  constructor(
    private api: ApiNodeProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController) {
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])]
      });
  }

  async login(){
    let email = this.loginForm.controls.email.value;
    let senha = this.loginForm.controls.password.value;
    await this.api.auth('/login', email, senha).subscribe(res =>{
   
      if(res == true){
        this.navCtrl.setRoot(TabsPage);
        console.log(res);
      } else if(res == false){
        console.log('Usuario nao cadastrado');
      }
    });
  }

  goToSignup(){
    this.navCtrl.push('SignupPage');
  }

}
