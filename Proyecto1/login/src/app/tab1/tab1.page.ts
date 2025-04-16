import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  texto1: string = "";
  usuarioDatos: any;

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    console.log("Ingreso a Tab1");
    this.usuarioDatos = await this.authService.getItem('uid');
    console.log(this.usuarioDatos.session.user.email);
    this.texto1 = this.usuarioDatos.session.user.email;
  }
}
