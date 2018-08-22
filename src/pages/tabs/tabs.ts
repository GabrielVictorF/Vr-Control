import { Component } from '@angular/core';

import { AdicionarPage } from '../adicionar/adicionar';
import { HomePage } from '../home/home';
import { MessagePage } from '../message/message';
import { UsuariosPage } from '../usuarios/usuarios';
import { PerfilPage } from '../perfil/perfil';
import { EventosPage } from '../eventos/eventos';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = AdicionarPage;
  tab3Root = MessagePage;
  tab4Root = UsuariosPage;
  tab5Root = PerfilPage;
  tab6Root = EventosPage;

  constructor() {

  }
}
