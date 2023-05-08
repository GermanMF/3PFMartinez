import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'controlErrorMessages'
})
export class ControlErrorMessagesPipe implements PipeTransform {

  transform(error: any, field?: string, ...args: unknown[]): unknown {
    if (!error) return;
    let defaultMsg = 'Error desconocido';
    const opciones: Record<string, string> = {
      required: 'Campo requerido',
      minlength: `Se esperan al menos ${error.value.requiredLength} caracteres`,
      email: 'El valor debe ser un e-mail valido',
      maxlength: `Se esperan ${error.value.requiredLength} caracteres como máximo`,
      max: `Máximo ${error.value.max} ${field}`,
      min: `Mínimo ${error.value.min} ${field}`
    }
    if (opciones[error.key]){
      defaultMsg = opciones[error.key]
    }
    return defaultMsg;
  }

}
