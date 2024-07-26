import { Component, OnInit, inject } from '@angular/core';
import { NewInputComponent } from '../new-input/new-input.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NewInputCheckboxComponent } from '../new-input-checkbox/new-input-checkbox.component';
import { NzCheckboxComponentCustom } from '../checkbox/checkbox.component';

@Component({
  selector: 'app-control-value-accessor',
  standalone: true,
  imports: [
    NewInputComponent,
    ReactiveFormsModule,
    NzInputModule,
    NewInputCheckboxComponent,
    NzCheckboxComponentCustom,
  ],
  template: `
    <div style="padding: 50px; padding-bottom: 100px">
      <label nz-checkbox>Checkbox</label>
      <p>control-value-accessor works!</p>
      <form [formGroup]="myForm">
        <input
          formControlName="test"
          nz-input
          placeholder="test"
          style="width: 40%; margin-bottom: 30px"
        />
        <br />
        <app-new-input formControlName="name"></app-new-input>

        <app-new-input-checkbox
          formControlName="check"
        ></app-new-input-checkbox>
      </form>
    </div>
  `,
  styleUrl: './control-value-accessor.component.scss',
})
export class ControlValueAccessorComponent implements OnInit {
  myForm!: FormGroup;

  private fb = inject(FormBuilder);

  worker!: Worker;
  constructor() {
    this.worker = new Worker(
      new URL('./../test-web-worker.worker.ts', import.meta.url),
    );
    this.worker.postMessage('123');
    this.worker.onmessage = (data) => {
      console.log(data);
    };

    console.log(this.worker);

    this.myForm = this.fb.group({
      test: this.fb.control(null),
      name: this.fb.control(null, [Validators.required]),
      check: this.fb.control(null),
    });
  }

  ngOnInit(): void {
    this.myForm.valueChanges.subscribe(console.log);
  }
}
