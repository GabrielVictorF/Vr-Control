import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController} from 'ionic-angular';
import { EditaPage } from '../edita/edita';
import { HomePage } from '../home/home';
import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider} from '../../providers/functions/functions';

import { AdicionarPage } from '../adicionar/adicionar';
import { LoginPage } from '../login/login';
import { PerfilPage } from '../perfil/perfil';
import { AlocarPecaPage } from '../alocar-peca/alocar-peca';

import { Item } from '../../models/item';
import { Empresa } from '../../models/empresa';
@Component({
  selector: 'page-detalhe',
  templateUrl: 'detalhe.html'
})
export class DetalhePage {
  private item: Item = []; 
  private item_empresa: Empresa = new Empresa;
  private nivel: number; //1 - Comum, 2 - Adm, 3 - Owner
  private nome: string; //No lugar do PIPE
  private ico: string = "arrow-dropdown";

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider,
  public functions: FunctionsProvider, public alertCtrl: AlertController, public modalCtrl: ModalController ) {
    this.item = this.navParams.get('item');
    this.nivel = localStorage.nivel;

    this.api.infoUser(this.item.ownerId).subscribe(res => { 
      if (res.nome == null)
        this.nome = 'Desconhecido';
      else
        this.nome = res.nome;
      console.log(this.item);
      },
      Error => {
        console.log(Error);
      });
  }

  private edita() {
    this.navCtrl.push(EditaPage, {'item': this.item});
  }

  deletar() {
    let tipo = {
      pronome: 'esse',
      nome: ''
    };
    switch (this.item.___class) {
      case 'Users': 
        tipo.nome = "usuario";
        break;
      case 'produto':
        tipo.nome = "item";
        break;
      case 'feedback':
        tipo.nome = "mensagem";
        tipo.pronome = "essa";
        break;
    }
    
    const confirm = this.alertCtrl.create({
      title: '<div class="card text-white bg-danger mb-3"><div class="card-header">Um momento...</div></div>',
      message: '<div class="alert alert-dark" role="alert">Tem certeza que quer excluir ' + tipo.pronome + ' ' + tipo.nome + '?</div>',
      buttons: [{
        text: 'Sim',
        handler: () => { 
          this.api.deleta(this.item.objectId, this.item.___class).subscribe(res => {
            if (this.item.___class == 'produto') {
              this.functions.mostraToast('Item Deletado!');
              this.navCtrl.setRoot(HomePage);
            } else if (this.item.___class == 'Users') {
              this.functions.mostraToast('Usuário Deletado!');
              this.navCtrl.pop();
            } else if (this.item.___class == 'feedback') {
              this.functions.mostraToast('Mensagem deletada!');
              this.navCtrl.pop();
            }
          },
          Error => {
            console.log(Error);
          });
        }},
        {
          text: 'Não',
          handler: () => { console.log('Não') }
        }
      ]
    });
    confirm.present();
  }

  public alocarPeca() {
    this.navCtrl.push(AlocarPecaPage, {item: this.item});
  }

  mudaIco() {
    if (this.ico == "arrow-dropdown")
      this.ico = "arrow-dropup";
    else 
      this.ico = 'arrow-dropdown';
  }
}
