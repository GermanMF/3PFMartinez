import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from 'src/app/dashboard/pages/alumnos/models';

@Pipe({
  name: 'locacion'
})
export class LocacionPipe implements PipeTransform {
  transform(value: Alumno, ...args: unknown[]): unknown {
    switch (value.online) {
      case false:
        return 'Presencial';
      case true:
        return 'Remoto';
      default:
        return 'Undefined';
    }
  }
}