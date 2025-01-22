import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'codeMasque',
  standalone: true
})
export class CodeMasquePipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/.(?=.{4})/g, '*');
  }

}
