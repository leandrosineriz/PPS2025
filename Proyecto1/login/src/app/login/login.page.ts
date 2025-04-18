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
  showContent: boolean = false; // Inicialmente oculto error

  constructor(private authService: AuthService, private router:Router, private supabase: SupabaseService) {}


  ngOnInit() {
    //console.log("Ingreso a Login");
  }


  onSubmit(form: NgForm) {
    this.login(form.value.user, form.value.password);
    form.reset();
  }

  
  // Funcion de login con localstorage
  login(user: string, password: string) {
    console.log("Mail:" + user + " \nPassword: " + password);
  
    this.supabase.login(user, password).then(async data => {  
      if (data.session.access_token) {
        await this.authService.setItem('uid', data); // Guardar el usuario en el almacenamiento local
        this.showContent = false; // Muestra el contenido después de iniciar sesión
        this.router.navigateByUrl('/tabs');
      } else {
        this.showContent = true; // Oculta el contenido si las credenciales son incorrectas   
        console.log("Password o usuario incorrecto.");
      }
    })
    .catch(err => { 
      this.showContent = true;
      console.log(err);
    });
  }

  loginVisitante() {
    this.user = "visitor@visitor.com";
    this.password = "visitor";

  }

  loginUsuario() {
    this.user = "user@user.com";
    this.password = "user";
  }

  loginAdmin () {
    this.user = "admin@admin.com";
    this.password = "admin";
  }
}
