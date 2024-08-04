import { HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { DataService } from '../../services/data.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ParentService } from '../parent/parent.service';
import { BehaviorSubject, filter, Observable } from 'rxjs';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
  // providers: [
  //   {
  //     provide: DataService,
  //     // useValue: {
  //     //   name: 'new name child',
  //     // },
  //   },
  // ],
})
export class ChildComponent implements OnChanges, OnInit {
  headerTpl$!: Observable<TemplateRef<any> | null>;
  @Input() headerTpl!: TemplateRef<any>; // pass template-ref-variable

  private dataService = inject(DataService);
  private userService = inject(UserService);
  private parentService = inject(ParentService);
  private cdr = inject(ChangeDetectorRef);
  constructor() {
    console.log('child component:', this.dataService.name);

    document.cookie = 'sessionId=xyz45623123; path=/; max-age=3600';
    document.cookie = 'sessionId2=xyz4566; path=/; max-age=3600';

    this.userService.getPosts().subscribe(console.log);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['headerTpl']) {
      console.log(this.headerTpl);
    }

  }

  ngAfterViewInit() {
    this.headerTpl$ = this.parentService.headerTpl$.pipe(
      filter((_) => Boolean(_)),
    );
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    // this.headerTpl$.pipe(filter((_) => Boolean(_))).subscribe({
    //   next: (tpl) => {
    //     console.log(tpl);
    //   },
    //   error: (err) => {},
    // });
  }
}
