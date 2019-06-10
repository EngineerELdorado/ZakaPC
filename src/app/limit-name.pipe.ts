import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitName'
})
export class LimitNamePipe implements PipeTransform {

  transform(value: string, args?: any): any {

    if(value.length>8){
      return value.substring(0,6)+"..."
    }
    return null;
  }

}
