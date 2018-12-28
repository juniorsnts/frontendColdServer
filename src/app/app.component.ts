import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Socket } from 'ng-socket-io';
import { ApiNodeProvider } from '../providers/api-node/api-node';
import { StorageProvider } from '../providers/storage/storage';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'LoginPage';

  constructor(
    private storage: StorageProvider,
    private api: ApiNodeProvider,
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.backgroundColorByHexString('#00004d');

      // this.storage.getStorage('token').then(res =>{
      //   this.api.loginAutomatico(res).subscribe(res =>{          
      //     if(res == 200){
      //       this.api.getToken();
      //       this.rootPage = TabsPage;
      //       splashScreen.hide();
      //     } else {
      //       this.rootPage = 'LoginPage';
      //       splashScreen.hide();
      //     }
      //   })
      // })
    });
  }
}

