import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'substringName'
})
export class SubstringNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value.length>8){
      return value.substring(0,6)+"..."
    }
    return value;
  }

}
