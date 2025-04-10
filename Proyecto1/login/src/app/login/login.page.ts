import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false
})
export class LoginPage implements OnInit {
  password: string = '';
  user: string = '';
  isLogin: boolean = false
  type: boolean = true;
  showContent: boolean = false; // Inicialmente oculto

  

  constructor(private authService: AuthService, private router:Router) {}


  ngOnInit() {
  }

  changeType() {
    this.type = !this.type; // Cambia el tipo de input entre password y text
  }

  onSubmit(form: NgForm) {
    this.login(form);
  }

  /*onSubmit(form: NgForm) {
    console.log(form);
    if(!form.valid) return;
    this.login(form);
  }*/


  login(form: NgForm) {
    console.log("Mail:" + form.value.user + " \nPassword: " + form.value.password);
    this.isLogin = true;
    this.authService.login(form.value.user, form.value.password).then(data => {
      if (data) {
        this.showContent = false; // Muestra el contenido después de iniciar sesión
        this.router.navigateByUrl('/tabs');
        this.isLogin = false;
        form.reset();
      } else {
        this.showContent = true; // Oculta el contenido si las credenciales son incorrectas
        this.isLogin = false;
        console.log("Password o usuario incorrecto.");
      }
    })
    .catch(err => {
      console.log(err);
      this.isLogin = false;
    });
  }
}
