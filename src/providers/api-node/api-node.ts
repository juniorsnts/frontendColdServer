import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiNodeProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ApiNodeProvider Provider');
  }

  url = "http://localhost:3000";

  headers = {
    'Content-Type': 'application/json'
  }  

  auth(caminhoNode, email, senha){
    let data = JSON.stringify({
      email: email,
      senha: senha
    });
    return this.http.post(this.url+caminhoNode, data, {headers: this.headers});
  }

  modoOnOff(id, modo){
    return this.http.get(this.url+'/ligaDesliga?id='+id+'&modo='+modo);
  }

  botoes(caminhoNode){
    return this.http.get(this.url+caminhoNode);
  }

  selecionaCentral(idCentral){
    return this.http.get(this.url+'/selecionaCentral?id='+idCentral);
  }

}
