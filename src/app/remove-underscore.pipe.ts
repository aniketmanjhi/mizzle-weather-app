import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeUnderscore',
})
export class RemoveUnderscorePipe implements PipeTransform {
  transform(value: any) {
    return value.split('_').join(' ');
  }
}
