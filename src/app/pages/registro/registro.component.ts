import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  usuarioService = inject(AuthService);

  form: FormGroup;
  loading: boolean = false;

  constructor() {
    this.form = this.fb.group(
      {
        nombre: ['', Validators.required],
        apellidos: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmarPassword: ['', Validators.required],
        terminos: [false, Validators.requiredTrue],
      },
      {
        validators: [this.passwordsMatchValidator],
      }
    );
  }

  // Validación personalizada para contraseñas
  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmar = group.get('confirmarPassword')?.value;
    return password === confirmar ? null : { passwordsMismatch: true };
  }

  registrar() {
    if (this.form.invalid) return;

    this.loading = true;
    const { nombre, apellidos, email, password } = this.form.value;

    const nuevoUsuario = {
      nombre,
      apellidos,
      email,
      password,
    };

    this.usuarioService.registro(nuevoUsuario).subscribe({
      next: () => {
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Ahora puedes iniciar sesión.',
          confirmButtonText: 'Ir al login',
          customClass: {
            confirmButton: 'btn btn-secondary',
          },
          buttonsStyling: false,
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/login']);
          }
        });
      },
      error: (err) => {
        this.loading = false;
        const mensaje =
          err.status === 409
            ? 'El correo ya está registrado.'
            : 'Error al registrar. Intenta nuevamente.';

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: mensaje,
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn btn-secondary',
          },
          buttonsStyling: false,
        });
      },
    });
  }
}
