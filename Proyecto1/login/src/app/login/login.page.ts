import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase/supabase.service';

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
  showContent: boolean = false; // Inicialmente oculto error

  

  constructor(private authService: AuthService, private router:Router, private supabase: SupabaseService) {}


  ngOnInit() {
    console.log("Ingreso a Login");
  }

  changeType() {
    this.type = !this.type; // Cambia el tipo de input entre password y text
  }

  onSubmit(form: NgForm) {
    this.login(form.value.user, form.value.password);
    form.reset();
  }

  
  // Funcion de login con localstorage
  login(user: string, password: string) {
    console.log("Mail:" + user + " \nPassword: " + password);
    this.isLogin = true;
    this.supabase.login(user, password).then(async data => {  
      //console.log(data);
      if (data.session.access_token) {
        await this.authService.setItem('uid', data); // Guardar el usuario en el almacenamiento local
        this.showContent = false; // Muestra el contenido después de iniciar sesión
        this.router.navigateByUrl('/tabs');
        this.isLogin = false;
      } else {
        this.showContent = true; // Oculta el contenido si las credenciales son incorrectas
        this.isLogin = false;
        console.log("Password o usuario incorrecto.");
      }
    })
    .catch(err => { 
      console.log(err);
    });
    /*this.authService.login(form.value.user, form.value.password).then(data => {
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
    });*/
  }

  loginVisitante() {
    //this.login("visitor@visitor.com", "visitor");
    this.user = "visitor@visitor.com";
    this.password = "visitor";

  }

  loginUsuario() {
    //this.login("user@user.com", "user");
    this.user = "user@user.com";
    this.password = "user";
  }

  loginAdmin () {
    //this.login("admin@admin.com", "admin");
    this.user = "admin@admin.com";
    this.password = "admin";
  }
}
