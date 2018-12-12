import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiNodeProvider } from '../../../providers/api-node/api-node';
import { TabsPage } from '../../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: any;

  constructor(
    private api: ApiNodeProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder) {
      this.signupForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  async signup(){
    let email = this.signupForm.controls.email.value;
    let senha = this.signupForm.controls.password.value;
    await this.api.auth('/cadastro', email, senha).subscribe(res =>{
      let data:any = res;
      if(data.estado == true){
        this.navCtrl.setRoot(TabsPage);
      } else {
        console.log('nao pode logar');
      }
    });          
  }

  goToLogin(){
    this.navCtrl.pop();
  }

}
