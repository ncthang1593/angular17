import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

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
export class ChildComponent {
  private dataService = inject(DataService);
  private userService = inject(UserService);

  constructor() {
    console.log('child component:', this.dataService.name);
    this.userService.getPosts().subscribe(console.log)
  }
}
