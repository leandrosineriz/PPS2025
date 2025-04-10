import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storage: Storage | null = null;
  private userAdmin: string = "";
  private passwordAdmin: string = "";

  constructor(private storageService: Storage) { 
    
  }

  async login(email: string, password: string): Promise<any> {
    this.storage = await this.storageService.create();
    //call login api
    await this.setItem('user', "admin");
    await this.setItem('password', "admin");

    await this.getItem('user').then((user) => { 
      this.userAdmin = user;
      console.log(this.userAdmin);
    });
    await this.getItem('password').then((pass) => { 
      this.passwordAdmin = pass;
      console.log(this.passwordAdmin);
    });

    console.log(this.userAdmin + " " + this.passwordAdmin);
    

    if (email !== this.userAdmin || password !== this.passwordAdmin) {  
      console.log("Error de credenciales");
      return await false;
    } else {
      console.log("Login correcto");
      return await true;
    }
    

  }

  register() {}

  resetPassword() {}

  logout() {
    
  }


  // Método para guardar datos
  async setItem(key: string, value: any): Promise<void> {
    await this.storage?.set(key, value);
    console.log(`Item con clave ${key} almacenado.`);
  }

  // Método para obtener datos
  async getItem(key: string): Promise<any> {
    const value = await this.storage?.get(key);
    console.log(`Item con clave ${key} obtenido:`, value);
    return value;
  }

  // Método para eliminar un dato específico
  async removeItem(key: string): Promise<void> {
    await this.storage?.remove(key);
    console.log(`Item con clave ${key} eliminado.`);
  }

  // Método para limpiar todo el almacenamiento
  async clear(): Promise<void> {
    await this.storage?.clear();
    console.log('Todo el almacenamiento ha sido limpiado.');
  }
}
