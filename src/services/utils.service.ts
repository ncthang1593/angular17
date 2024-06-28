import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}
  checkNumber(data: any): boolean {
    return typeof data === 'number';
  }
}
