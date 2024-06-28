import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$ = new BehaviorSubject<UserInterface[]>([]);
  constructor(private httpClient: HttpClient) {}

  addUser(user: UserInterface) {
    this.user$.next([...this.user$.getValue(), user]);
  }

  removeUser(userId: any) {
    this.user$.next(this.user$.getValue().filter((_) => _.id !== userId));
  }

  getIsNumber(num: any) {}

  getPosts() {
    return this.httpClient.get('https://jsonplaceholder.typicode.com/posts');
  }
}

interface UserInterface {
  name: string;
  id: any;
}
