import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import sha256 from 'sha256';

@Injectable()
export class ApiNodeProvider {

  constructor(public http: HttpClient) {
  }

  url = "http://192.168.2.108:3000";

  headers = {
    'Content-Type': 'application/json'
  }  

  auth(caminhoNode, email, senha){
    let data = JSON.stringify({
      email: email,
      senha: sha256(senha)
    });
    return this.http.post(this.url+caminhoNode, data, {headers: this.headers});
  }

  modoOnOff(id, modo){
    return this.http.get(this.url+'/ligaDesliga?id='+'1'+'&modo='+modo);
  }

  botoes(caminhoNode){
    return this.http.get(this.url+caminhoNode);
  }

  selecionaCentral(idCentral){
    return this.http.get(this.url+'/selecionaCentral?id='+idCentral);
  }

  cadastrarCentral(nomeCentral){
    let data = JSON.stringify({
      nome_central: nomeCentral
    });
    return this.http.post(this.url+'/cadastrar-central', data, {headers: this.headers});
  }

}
