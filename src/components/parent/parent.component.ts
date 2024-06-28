import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-parent',

  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [
  //   {
  //     provide: DataService,
  //     // useClass: OtherDataService,
  //   },
  // ],
})
export class ParentComponent implements OnInit {
  myForm!: FormGroup<{ name: FormControl; age: FormControl }>;
  @Input() message = 'test';

  private readonly fb = inject(FormBuilder);
  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  setNewMessage() {
    setTimeout(() => {
      this.message = 'new message';
    }, 1000);
  }
}
