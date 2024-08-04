import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ParentService {
  headerTpl$ = new Subject<TemplateRef<any>>();

  constructor() {}
}
