import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

@Component({
  templateUrl: 'alocar-peca.html'
})
export class AlocarPecaPage {
  private eventos: any = [];
  private item: any = [];
  constructor(public navCtrl: NavController, private api: ApiProvider, public navParams: NavParams) {
    this.item = this.navParams.get("item");
    this.api.getEventos().subscribe(res => {
      console.log(res);
      this.eventos = res;
    });
  }
}