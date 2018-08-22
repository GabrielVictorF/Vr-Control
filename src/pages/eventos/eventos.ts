import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { DetalhePage } from '../detalhe/detalhe';
import { LoginPage } from '../login/login';

import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

@Component({
  templateUrl: 'eventos.html'
})

export class EventosPage  {
  private data: any = [];

  constructor(public navCtrl: NavController, public api: ApiProvider, 
  public loadingCtrl: LoadingController, public alertCtrl: AlertController,
  private functions: FunctionsProvider) {
    this.getEventos();
  }

  getEventos(refresher?) {
    const load = this.loadingCtrl.create({
      content: 'Obtendo eventos, por favor aguarde.'
    });
    load.present();
    this.api.getEventos().subscribe(res => {
      if (refresher)
          refresher.complete();
      this.data = res;
      load.dismiss();
      console.log(this.data);
    }, 
    Error => {
      if (Error.error.code == 3064) {
        load.dismiss();
        this.functions.logout();
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }
  detalhe(x) {
    this.navCtrl.push(DetalhePage, {item: x});
  }
}