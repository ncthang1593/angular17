import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users$ = new BehaviorSubject<UserInterface[]>([
    {
      name: 'aaa',
      age: 10,
    },
    {
      name: 'bbb',
      age: 12,
    },
  ]);
}

export interface UserInterface {
  name: string;
  age: any;
}
