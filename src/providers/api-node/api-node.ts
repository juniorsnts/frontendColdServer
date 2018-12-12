import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import sha256 from 'sha256';

let idCentralSelecionada;

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
    return this.http.get(this.url+'/ligaDesliga?id='+idCentralSelecionada+'&modo='+modo); // pegar id da tab home
  }

  botoes(caminhoNode){
    return this.http.get(this.url+caminhoNode);
  }

  selecionaCentral(idCentral){
    idCentralSelecionada = idCentral;
    return this.http.get(this.url+'/selecionaCentral?id='+idCentral);
  }

  cadastrarCentral(nomeCentral, potencia){
    let data = JSON.stringify({
      nome_central: nomeCentral,
      potencia_central: potencia
    });
    return this.http.post(this.url+'/cadastrar-central', data, {headers: this.headers});
  }

  ultimoEstado(){
    return this.http.get(this.url+'/ultimoEstado?id='+idCentralSelecionada);
  }

}
