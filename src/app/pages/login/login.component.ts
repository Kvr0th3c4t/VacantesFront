import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  modelForm: FormGroup;
  loginService = inject(AuthService);
  router = inject(Router);

  constructor() {
    this.modelForm = new FormGroup({
      username: new FormControl(null, []),
      password: new FormControl(null, []),
    });
  }

  getUser() {
    const user = this.modelForm.value;
    this.loginService.login(user).subscribe({
      next: (res) => {
        const rol = res.user.rol;

        if (!res.accessToken) {
          return alert('Usuario o contraseña incorrectos');
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
        alert('Usuario o contraseña incorrectos');
        this.modelForm.reset();
      },
    });
  }
}
