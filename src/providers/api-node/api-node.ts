import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import sha256 from 'sha256';
import { StorageProvider } from '../storage/storage';

let idCentralSelecionada;

@Injectable()
export class ApiNodeProvider {  
  
  token: any;
  constructor(private storage: StorageProvider,public http: HttpClient) {
    this.storage.getStorage('token').then(res=>{
      this.token = res;      
    })   
    console.log(this.token);    
  }

  url = "http://192.168.2.108:3000";

  headers = {
    'Content-Type': 'application/json',
    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidGVzdGUxIiwiaWF0IjoxNTQ0NjM3MjI4LCJleHAiOjE1NDQ2NDA4Mjh9.IHv-RYKkYM_HLzEt143WvAZMUN5t32HMSjJdXKtbx2M',
  }
  
  getToken(){
  }

  auth(caminhoNode, email, senha){
    let data = JSON.stringify({
      email: email,
      senha: sha256(senha)
    });
    return this.http.post(this.url+caminhoNode, data, {headers: {'Content-Type': 'application/json'}});
  }

  modoOnOff(id, modo){
    return this.http.get(this.url+'/ligaDesliga?id='+idCentralSelecionada+'&modo='+modo, {headers: this.headers}); // pegar id da tab home
  }

  botoes(caminhoNode){
    return this.http.get(this.url+caminhoNode, {headers: this.headers});
  }

  selecionaCentral(idCentral){
    idCentralSelecionada = idCentral;
    return this.http.get(this.url+'/selecionaCentral?id='+idCentral, {headers: this.headers});
  }

  cadastrarCentral(nomeCentral, potencia){
    let data = JSON.stringify({
      nome_central: nomeCentral,
      potencia_central: potencia
    });
    return this.http.post(this.url+'/cadastrar-central', data, {headers: this.headers});
  }

  ultimoEstado(){
    return this.http.get(this.url+'/ultimoEstado?id='+idCentralSelecionada, {headers: this.headers});
  }

}
