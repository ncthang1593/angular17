import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-new-input',
  standalone: true,
  imports: [NzInputModule, ReactiveFormsModule],
  templateUrl: './new-input.component.html',
  styleUrl: './new-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NewInputComponent),
      multi: true,
    },
  ],
  // viewProviders: [
  //   {
  //     provide: ControlContainer,
  //     useFactory: () => inject(ControlContainer, { skipSelf: true }),
  //   },
  // ],
})
export class NewInputComponent implements ControlValueAccessor {
  // @Input({ required: true }) controlName!: string;
  value: string = '';
  onChange!: (provinceData: any) => void;
  onTouched!: (() => void);

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {}

  handleChange(event: any) {
    this.onChange(event.target.value);
    this.onTouched();
  }
}
