import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzInputDirective } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-new-input-checkbox',
  standalone: true,
  imports: [NzInputDirective],
  template: `<p>new-input-checkbox works!</p>
    <label>
      <input type="checkbox" />
      <!--        (change)="onCheckboxChange($event)"-->
      {{ label }}
    </label>

    <!--    <input type="checkbox" [value]="value" (change)="handleChange($event)" />--> `,
  styleUrl: './new-input-checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NewInputCheckboxComponent),
      multi: true,
    },
  ],
})
export class NewInputCheckboxComponent implements ControlValueAccessor {
  value = false;
  label = 'label';
  onChange!: (provinceData: any) => void;
  onTouched!: () => void;

  writeValue(value: any) {
    this.value = !value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {}

  handleChange(event: any) {
    this.onChange(event.target.checked);
    this.onTouched();
  }
}
