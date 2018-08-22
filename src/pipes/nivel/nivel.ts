import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nivel',
})
export class NivelPipe implements PipeTransform {
  transform(value) {
    switch (value) {
      case 1: 
        return 'Comum';
      case 2: 
        return 'Administrador / Dono';
      case 3: 
        return 'Desenvolvedor';
      default:
      return value;
    }
  }
}