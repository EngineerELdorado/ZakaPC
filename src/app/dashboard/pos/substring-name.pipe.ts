import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'substringName'
})
export class SubstringNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value.length>13){
      return value.substring(0,13).toLowerCase()
    }
    return value.toLowerCase();
  }

}
