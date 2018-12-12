import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'; 

@Injectable()
export class StorageProvider {

  constructor(private storage: Storage) {

  }

  setStorage(nome, token){    
    return this.storage.set(nome, token);
  }

  getStorage(nome){   
    return new Promise((resolve, reject)=>{
      this.storage.get(nome).then((resp)=>{
        resolve(resp);
      });
    });
  }

  removeStorage(nome){
    this.storage.remove(nome);
  }

}
