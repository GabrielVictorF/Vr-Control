import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Usuario } from '../../models/usuario';
import { Empresa } from '../../models/empresa';

@Injectable()
export class ApiProvider {
  private APP_ID: string;
  private API_KEY: string;
  private URL: string;
  private REST_API: string;
  public sessao: any;

  constructor(public http: HttpClient) {
    this.APP_ID = 'DDF9D7C5-B0D0-7BCF-FF73-57507DD48500';
    this.API_KEY = 'F2DCF51C-F7F2-C5E6-FFB3-B6A93BB7AC00';
    this.URL = 'https://api.backendless.com';
    this.REST_API = this.URL + '/' + this.APP_ID  + '/' + this.API_KEY;
  }

  getFiles():any {
    const url: string = this.REST_API + '/files/logo_aqui.png';
    // const httpOptions = ({
    //   headers: new HttpHeaders({
    //     'user-token': localStorage.userToken
    //   })
    // });
    return this.http.get(url);
  }

  getProdutos() {
    const url: string = this.REST_API + '/data/produto?pageSize=100';
    const httpOptions = ({
      headers: new HttpHeaders({
        'user-token': localStorage.userToken
      })
    });
    return this.http.get<Item>(url, httpOptions);
  }

  getPesquisa(termo) {
    const where = "?where=nome%20LIKE%20'%25" + termo + "%25'";
    const httpOptions = ({
      headers: new HttpHeaders({
        'user-token': localStorage.userToken
      })
    });
    const url = this.REST_API + '/data/produto' + where;
    return this.http.get(url, httpOptions);
  }

  getMessages() {
    const url: string = this.REST_API + '/data/feedback';
    return this.http.get(url);
  }

  public enviaMensagem(message: string) {
    const url = this.REST_API + '/data/feedback';
    const httpOptions = ({
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'user-token': localStorage.userToken
      })
    });
  let body = {
    message: message,
  }
    return this.http.post(url, body, httpOptions);
  }

  public login(email: string, password: string): any {
    const url = this.REST_API + '/users/login';
    const httpOptions = ({
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
    
    let body = {
    	login: email,
    	password: password
    }
  	return this.http.post<Usuario>(url,
  		body, httpOptions);
	}

  public adicionarItem(item) {
    const url = this.REST_API + '/data/produto';
    const httpOptions = ({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'user-token': localStorage.userToken
      })
    });
    let body = {
    	nome: item.nome,
      quantidade: parseInt(item.quantidade),
      preco: parseFloat(item.preco),
      
    }
  	return this.http.post<Item>(url,
  		body, httpOptions);
	}

  public editaItem(item: Item) {
    var url = this.REST_API + '/data/produto/' + item.objectId;
    const httpOptions = ({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'user-token': localStorage.userToken
      })
    });
    let body = {
      nome: item.nome,
      quantidade: parseInt(item.quantidade),
      preco: item.preco
    };
    return this.http.put<Item>(url, body, httpOptions);
  }

  public deleta(id: string, dir: string): any {
    const url = this.REST_API + '/data/' + dir + '/' + id;
    return this.http.delete(url);
  }

  public cadastra(user):any {
    const url = this.REST_API + '/users/register';
   const httpOptions = ({
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  let body = {
    email: user.email,
    password: user.password,
    nome: user.nome,
    cargo: user.cargo
  }
  return this.http.post<Usuario>(url, body, httpOptions);
  }

  public infoUserWhere(user): any {
    var encoded = encodeURIComponent(user);
    const where = "?where=nome%3D'" + encoded + "'";
    console.log(where);
    const urlBuscaUser = this.REST_API + '/data/Users' + where;
    console.log(urlBuscaUser);

    return this.http.get(urlBuscaUser);
  }

  public resetSenhaStep2(userId): any {
    console.log(userId);
    return this.http.get(userId);  
  }
  public infoUser(userId?): any {
    let url: string;
    let user: string;
    if (userId) {
      url = this.REST_API + '/data/Users/' + userId;
    } else {
      url = this.REST_API + '/data/Users';
    }
    
    return this.http.get<Usuario>(url);
  }

  public editaUser(user: Usuario) {
    const url = this.REST_API + '/data/Users/' + user.ownerId;
    console.log(user.nivel);
    const httpOptions = ({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'user-token': localStorage.userToken
      })
    });
    let body = {
      email: user.email,
      nome: user.nome,
      nivel: parseInt(user.nivel),
      cargo: user.cargo
    }
    return this.http.put<Usuario>(url, body, httpOptions);
  }

  public logout() {
    const url = this.REST_API + '/users/logout';
    const httpOptions = ({
      headers: new HttpHeaders({
        'user-token': localStorage.userToken
      })
    });
    
    return this.http.get(url, httpOptions);
  }

  public validaToken() {
    const url = this.REST_API + '/users/isvalidusertoken/' + localStorage.userToken;
    return this.http.get(url);
  }

  atualizaQuantidade(quantidade, objectId) {
      const url = this.REST_API + '/data/produto/' + objectId;
      const httpOptions = ({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'user-token': localStorage.userToken
        })
      });
      let body = {
        quantidade: parseInt(quantidade)
      }
      return this.http.put(url, body, httpOptions);
  }

  public getEmpresaRelation(id?) {
    let url: string;
    if (id)
      url = this.REST_API + '/data/empresa/' + id;
    else 
      url = this.REST_API + '/data/empresa';
    return this.http.get<Empresa>(url); 
  }

  public postEvento(evento) {
    const url = this.REST_API + '/data/evento';
    const httpOptions = ({
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'user-token': localStorage.userToken
      })
    });
    let body = {
      localizacao: evento.localizacao
    }

   return this.http.post(url, body, httpOptions);
  }

  public getEventos() {
    const url = this.REST_API + '/data/evento?loadRelations=pecas';
    const httpOptions = ({
      headers: new HttpHeaders({
        'user-token': localStorage.userToken
      })
    });
    return this.http.get(url, httpOptions);
  }
}
