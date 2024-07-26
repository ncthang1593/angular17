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
import { TestComponent } from '../test/test.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ReactiveFormsModule, TestComponent, CommonModule],
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
  isShowSwiper = true;

  private readonly fb = inject(FormBuilder);

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  setNewMessage() {
    setTimeout(() => {
      this.message = 'new message';
    }, 1000);
  }

  removeSwiper(): void {
    this.isShowSwiper = !this.isShowSwiper;
  }
}
