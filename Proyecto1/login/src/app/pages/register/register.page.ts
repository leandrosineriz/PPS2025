import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  email: string = '';
  emailError: string | null = null;
  password: string = '';
  passwordError: string | null = null;
  registerCorrect: string | null = null;
  isButtonDisabled: boolean = false; // Initial state of the button
  passwordType: string = 'password'; // Por defecto, el tipo es password
  passwordIcon: string = 'eye-off';  // Ícono para indicar contraseña oculta

  
  constructor(private router:Router, private supabase: SupabaseService) { }

  ngOnInit() {
  }

  async onSubmit(form: any) {
    this.emailError = null;
    this.passwordError = null;
    if (this.validateEmail(this.email)) {
      console.log('Correo electrónico válido');
      this.emailError = null;
      // Aquí puedes proceder con el envío del formulario o cualquier lógica adicional
      if (this.validatePassword(this.password)) {
        console.log('Contraseña válida');
        this.passwordError = null;
        // Aquí puedes proceder con el envío del formulario o cualquier lógica adicional
        this.isButtonDisabled = true;
        try {
          await this.supabase.register(this.email, this.password);
          this.registerCorrect = "Registrado correctamente"
          
          setTimeout(() => {
            this.registerCorrect = "Volviendo a pagina de ingreso...";
            setTimeout(() => {
              this.router.navigateByUrl('/login');
            }, 1500);
          }, 2000);

        } catch (error) {
          this.passwordError = "El correo no es valido o ya se encuentra en uso, intentelo de nuevo.";
          this.isButtonDisabled = false;  
        }    
      } else {
        this.passwordError = 'Contraseña inválida. Debe tener al menos 8 caracteres, incluyendo una letra mayúscula, un número y un carácter especial.';
      }
    } else {
      this.emailError = 'Correo electrónico inválido. Por favor, ingresa un correo electrónico válido.';
    }
  }

  validatePassword(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.-])[A-Za-z\d@$!%*?&#.-]{8,}$/;
    return regex.test(password);
  }
  
  validateEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  togglePasswordVisibility() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye'; // Cambiar a ícono de ojo abierto
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off'; // Cambiar a ícono de ojo cerrado
    }
  }
  
}
