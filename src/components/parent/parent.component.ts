import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { blue, error1 } from './validator';
import { readMoneyVN } from '../../shared/utils/read-money';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NzInputModule],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  // providers: [
  //   {
  //     provide: DataService,
  //     // useClass: OtherDataService,
  //   },
  // ],
})
export class ParentComponent implements OnInit {
  myForm!: FormGroup<{
    name: FormControl;
    age: FormControl;
    money: FormControl;
  }>;
  @Input() message = 'test';
  readMoney = readMoneyVN
  private readonly fb = inject(FormBuilder);

  private get ageControl(): FormControl {
    return this.myForm.get('age') as FormControl;
  }

  get moneyControl(): FormControl {
    return this.myForm.get('money') as FormControl;
  }

  constructor(private dataService: DataService) {
    this.myForm = this.fb.group({
      name: this.fb.control('', [Validators.required, blue('customData')]),
      age: this.fb.control('', { validators: [error1(this.myForm)] }),
      money: this.fb.control(''),
    });
  }

  ngOnInit(): void {
    this.myForm.valueChanges.subscribe((res) => {
      // this.updateValidator(res);
    });

    // console.log(readMoney(2));
    // console.log(readMoney(200));
    // console.log(this.readMoney(4123123101));
    // console.log(this.readMoney(22211));
    // console.log(this.readMoney(3215));
    // console.log(this.readMoney(4217));
    // console.log(this.readMoney(5229));
    // console.log(this.readMoney(5275));
    // console.log(this.readMoney(5971));
    // console.log(this.readMoney(5482));
  }

  setError2() {
    console.log(this.ageControl.errors);
    let errors = this.ageControl.errors;
    this.ageControl.setErrors({ ...errors, error2: true });
    console.log(this.ageControl);
  }

}
