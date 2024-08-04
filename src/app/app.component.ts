import { Component, Host, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParentComponent } from '../components/parent/parent.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ChildComponent } from '../components/child/child.component';
import { DataService } from '../services/data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ControlValueAccessorComponent } from '../components/control-value-accessor/control-value-accessor/control-value-accessor.component';
import { NgIf } from '@angular/common';
import { ParentService } from '../components/parent/parent.service';
import { take, timer } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ParentComponent,
    NzButtonModule,
    ChildComponent,
    HttpClientModule,
    ControlValueAccessorComponent,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    {
      provide: DataService,
    },
  ],
})
export class AppComponent implements OnInit {
  title = 'angular17';
  isShow = true;

  // private dataService = inject(DataService)
  private parentService = inject(ParentService);
  private userService = inject(UserService);
  constructor(@Host() private dataService: DataService) {
    this.dataService.name = 'new data from app';
  }

  ngOnInit(): void {
    timer(3000)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.userService.getPosts().subscribe((res: any) => {
            console.log(res);
            this.userService.user$.next(res);
            this.isShow = false;
          });
        },
      });
  }
}
