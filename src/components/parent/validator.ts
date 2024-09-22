import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function blue(data: any): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const anotherControlValue = control?.parent?.get('')?.value;
    return control.value?.toLowerCase() === 'blue'
      ? null
      : { wrongColor: control.value };
  };
}

export function error1(data: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const anotherControlValue = control?.parent?.get('name')?.value;
    return control?.value === '18' ? { ...control.errors, error1: true } : null;
  };
}
