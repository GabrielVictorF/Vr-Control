import { Component } from '@angular/core';
import { Platform, LoadingController, AlertController } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ApiProvider } from '../providers/api/api';
import { FunctionsProvider } from '../providers/functions/functions';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, public api: ApiProvider, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public functions: FunctionsProvider) {
    platform.ready().then(() => {   
      if (localStorage.userToken) {
        console.log(localStorage.userToken);
        this.api.validaToken().subscribe(res => {
           console.log(res);
          if (res) {
            this.rootPage = TabsPage;
          } else {
            this.functions.logout();
            this.rootPage = LoginPage;
          } 
        });
      } else {
        this.rootPage = LoginPage;
      }    
    });
  }
}