import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Promise<boolean> {
    // Aquí debes llamar a tu API para verificar las credenciales
    return this.http.post<{ token: string }>('/api/login', { email, password })
      .toPromise()
      .then(response => {
        if (response.token) {
          // Guarda el token en el almacenamiento local para sesiones posteriores
          localStorage.setItem('authToken', response.token);
          return true;
        }
        return false;
      })
      .catch(err => {
        console.error('Login fallido', err);
        return false;
      }); 
  }

  logout() {
    // Para cerrar sesión, simplemente elimina el token
    localStorage.removeItem('authToken');
  }
}
