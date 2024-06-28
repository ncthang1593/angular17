import { Component, OnInit, inject } from '@angular/core';
import { NewInputComponent } from '../new-input/new-input.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-control-value-accessor',
  standalone: true,
  imports: [NewInputComponent, ReactiveFormsModule, NzInputModule],
  templateUrl: './control-value-accessor.component.html',
  styleUrl: './control-value-accessor.component.scss',
})
export class ControlValueAccessorComponent implements OnInit {
  myForm!: FormGroup;

  private fb = inject(FormBuilder);

  worker!: Worker;
  constructor() {
    this.worker = new Worker(
      new URL('./../test-web-worker.worker.ts', import.meta.url)
    );
    this.worker.postMessage('123');
    this.worker.onmessage = (data) => {
      console.log(data);
    };
    
    console.log(this.worker);

    this.myForm = this.fb.group({
      test: this.fb.control(null),
      name: this.fb.control(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.myForm.valueChanges.subscribe(console.log);
  }
}
