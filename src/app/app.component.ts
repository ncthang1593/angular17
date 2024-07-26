import { Component, Host, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParentComponent } from '../components/parent/parent.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ChildComponent } from '../components/child/child.component';
import { DataService } from '../services/data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ControlValueAccessorComponent } from '../components/control-value-accessor/control-value-accessor/control-value-accessor.component';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    {
      provide: DataService,
      // useValue: {
      //   name: 'new hello 1',
      // },
    },
  ],
})
export class AppComponent {
  title = 'angular17';

  // private dataService = inject(DataService)
  constructor(@Host() private dataService: DataService) {
  }
}
