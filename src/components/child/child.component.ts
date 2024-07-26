import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { UserInterface, UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ControlContainer } from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-child',
  standalone: true,
  template: `
    <p>child works!</p>

    <input type="text" [placeholder]="tpl" />

    <ng-container *ngIf="user$ | async as users">
      <ul>
        <li *ngFor="let user of users">{{ user.name }} - {{ user.age }}</li>
      </ul>
    </ng-container>

    <div>
      <ng-container
        *ngTemplateOutlet="tpl; context: { name: 'thang' }"
      ></ng-container>
    </div>

    <ng-template #tpl let-name="name">
      <p>hello template - {{ name }}</p>
    </ng-template>
  `,
  imports: [CommonModule],
  styleUrl: './child.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {
  user$!: BehaviorSubject<UserInterface[]>;

  private dataService = inject(DataService);
  private userService = inject(UserService);

  constructor() {
    this.user$ = this.userService.users$;
  }
}
