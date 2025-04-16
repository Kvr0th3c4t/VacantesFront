import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  modelForm: FormGroup;
  loginService = inject(AuthService);
  router = inject(Router);
  loading: boolean;

  constructor() {
    this.modelForm = new FormGroup({
      username: new FormControl(null, []),
      password: new FormControl(null, []),
    });
    this.loading = false; // Inicializa loading en false
  }
  ngOnInit() {
    localStorage.clear();
  }
  getUser() {
    this.loading = true;

    const user = this.modelForm.value;

    this.loginService.login(user).subscribe({
      next: (res) => {
        this.loading = false;
        const rol = res.user.rol;

        if (!res.accessToken) {
          this.mostrarError('Usuario o contraseña incorrectos');
          return;
        }

        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('refreshToken', res.refreshToken);

        this.modelForm.reset();

        switch (rol) {
          case 'CLIENTE':
            this.router.navigate(['/usuario/home']);
            break;
          case 'ADMON':
            this.router.navigate(['/admin/home']);
            break;
          default:
            console.error('Rol no reconocido:', rol);
            break;
        }
      },
      error: (err) => {
        this.loading = false;
        this.mostrarError('Usuario o contraseña incorrectos');
        this.modelForm.reset();
      },
    });
  }

  private mostrarError(mensaje: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Login fallido',
      text: mensaje,
      confirmButtonText: 'Aceptar',
      customClass: {
        confirmButton: 'btn btn-secondary',
      },
      buttonsStyling: false,
    });
  }
}
