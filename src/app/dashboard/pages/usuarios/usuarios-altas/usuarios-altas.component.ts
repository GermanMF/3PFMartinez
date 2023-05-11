import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/core/models';

@Component({
  selector: 'app-usuarios-altas',
  templateUrl: './usuarios-altas.component.html',
  styleUrls: ['./usuarios-altas.component.scss'],
})
export class UsuariosAltasComponent {
  role = ['admin', 'user'];
  registerForm: FormGroup = new FormGroup({});
  isNewRecord = !this.data;

  nombreControl = new FormControl(!this.isNewRecord ? this.data.nombre : '', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(15),
  ]);
  apellidoControl = new FormControl(
    !this.isNewRecord ? this.data.apellido : '',
    [Validators.required, Validators.minLength(3), Validators.maxLength(15)]
  );
  passwordControl = new FormControl(null, [Validators.required]);
  roleControl = new FormControl(!this.isNewRecord ? this.data.role : '', [
    Validators.required,
  ]);
  emailControl = new FormControl(!this.isNewRecord ? this.data.email : '', [
    Validators.required,
    Validators.email,
  ]);
  confirmPasswordControl = new FormControl(null, [Validators.required]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private dialogRef: MatDialogRef<UsuariosAltasComponent>
  ) {
    this.registerForm = new FormGroup({
      nombre: this.nombreControl,
      apellido: this.apellidoControl,
      password: this.passwordControl,
      confirmPass: this.confirmPasswordControl,
      role: this.roleControl,
      email: this.emailControl,
    });
  }

  onSubmit(): void {
    console.log(this.registerForm)
    if (this.registerForm.valid) {
      if (this.passwordControl.value === this.confirmPasswordControl.value) {
        const newUsuario = {
          ...this.data,
          id: this.data ? this.data.id : undefined,
          nombre: this.nombreControl.value,
          apellido: this.apellidoControl.value,
          role: this.roleControl.value,
          email: this.emailControl.value,
          password: this.passwordControl.value,
          token: ""
        };
        this.dialogRef.close(newUsuario);
      } else {
        alert('Las Contraseñas no coinciden');
      }
    }
  }
}
