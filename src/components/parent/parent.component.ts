import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Host,
  Inject,
  Input,
  OnInit,
  Self,
  SkipSelf,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { DataService } from '../../services/data.service';
import { ChildComponent } from '../child/child.component';
import { ParentService } from './parent.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ReactiveFormsModule, ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
  // providers: [
  //   {
  //     provide: DataService,
  //     // useClass: OtherDataService,
  //   },
  // ],
})
export class ParentComponent implements OnInit, AfterViewInit {
  myForm!: FormGroup<{ name: FormControl; age: FormControl }>;
  @Input() message = 'test';
  @ViewChild('headerTpl') headerTpl!: TemplateRef<any>;

  private readonly fb = inject(FormBuilder);
  private parentService = inject(ParentService);
  private cdr = inject(ChangeDetectorRef);
  private userService = inject(UserService);
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    console.warn('init parent component');
    console.log(this.userService.user$.getValue());
  }

  ngAfterViewInit(): void {
    console.log(this.headerTpl);
    this.parentService.headerTpl$.next(this.headerTpl);
    this.cdr.detectChanges();
  }

  setNewMessage() {
    setTimeout(() => {
      this.message = 'new message';
    }, 1000);
  }
}

type MyGenericData<T> = {
  data: T;
};

type Example = MyGenericData<number>;

interface InterfaceA {
  id: number;
  name: string;
}
interface InterfaceB {
  id: number;
  description: string;
}
let myVariable: InterfaceA | InterfaceB;

enum PaticipationStatus {
  Joined = 'JOINED',
  Left = 'LEFT',
  Pending = 'PENDING',
}
