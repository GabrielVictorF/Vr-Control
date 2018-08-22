import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';

import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

@Component({
  selector: 'page-adicionar',
  templateUrl: 'adicionar.html'
})
export class AdicionarPage {
  public item = {
    nome: '',
    quantidade: '',
    preco: '',
    localizacao: ''
  }

  private evento = {
    localizacao: ''
  }
  private user = {
    email: '',
    password: '',
    nome: '',
    cargo: ''
  }
  private ico = {
    icoEvento: 'arrow-dropdown-circle',
    icoPeca: 'arrow-dropdown-circle',
    icoUser: 'arrow-dropdown-circle'
  }
  private show = {
    mostraEvento: false,
    mostraUser: false,
    mostraPeca: false
  }
  
  private tipo: string;

  constructor(public navCtrl: NavController, public api: ApiProvider, private functions: FunctionsProvider, public navParams: NavParams) {
  }

  adicionar() { //PEÇA
    this.api.adicionarItem(this.item).subscribe(res => {
      this.functions.mostraToast(this.item.nome + ' adicionado com sucesso!');
      this.navCtrl.pop();
      console.log(res)
    },
    Error => {
      console.log(Error);
    });    
  }

  mostra(div) {
    this.api.validaToken().subscribe(res => {
      console.log(res);
      if (!res) {
        this.functions.logout();
        this.navCtrl.setRoot(LoginPage);
      }
    });
    if (div == "user") {
      this.show.mostraUser = true;
    if (this.ico.icoUser == "arrow-dropdown-circle")
      this.ico.icoUser = "arrow-dropup-circle";
    else
      this.ico.icoUser = "arrow-dropdown-circle";
    } else if (div == "evento") {
      this.show.mostraEvento = true;
      if (this.ico.icoEvento == "arrow-dropdown-circle")
        this.ico.icoEvento = "arrow-dropup-circle";
      else
        this.ico.icoEvento = "arrow-dropdown-circle";
    } else {
      this.show.mostraPeca = true;
        if (this.ico.icoPeca == "arrow-dropdown-circle")
      this.ico.icoPeca = "arrow-dropup-circle";
        else
      this.ico.icoPeca = "arrow-dropdown-circle";
    }
  }

  cadastrar() { // USUÁRIO
    if (this.user.email == '' || this.user.password == '')
      this.functions.mostraToast('Preencha todos os campos!');
    //  else if (this.user.password != this.password2)
    //   this.functions.mostraToast('As senhas não condizem!');
    else {
      this.api.cadastra(this.user).subscribe(res => {
        this.functions.mostraAlert('Criado!', 'Funcionário cadastrado com sucesso!'); 
        this.navCtrl.pop();
      },
      Error => {
        console.log(Error);
        const message = Error.error.code;
        this.functions.mostraAlert('Erro ao criar conta!', message);
      });
    }
  }

  addEvento() {
    this.api.postEvento(this.evento).subscribe(res => {
      this.functions.mostraToast('Evento adicionado com sucesso!');
      //this.navCtrl.pop();
      console.log(res)
    },
    Error => {
      console.log(Error);
    });    
  }
}
