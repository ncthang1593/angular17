import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInputComponent } from './new-input.component';

describe('NewInputComponent', () => {
  let component: NewInputComponent;
  let fixture: ComponentFixture<NewInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
