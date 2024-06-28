import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ParentComponent } from './parent.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('ParentComponent', () => {
  let component: ParentComponent;
  let fixture: ComponentFixture<ParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentComponent, HttpClientTestingModule],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(ParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render message', () => {
    const div = fixture.debugElement.query(
      By.css('[data-testId="message-container"]')
    );
    expect(div.nativeElement.textContent.trim()).toEqual(component.message);
  });

  it('render new message', () => {
    component.message = 'hello 1';
    const div = fixture.debugElement.query(
      By.css('[data-testId="message-container"]')
    );
    fixture.detectChanges();
    expect(div.nativeElement.textContent.trim()).toEqual(component.message);
  });

  it('get new message', fakeAsync(() => {
    component.setNewMessage();
    tick(1000)
    const div = fixture.debugElement.query(
      By.css('[data-testId="message-container"]')
    );
    fixture.detectChanges();
    console.log(div.nativeElement.textContent.trim());
    console.log(component.message);
    expect(div.nativeElement.textContent.trim()).toEqual(component.message);
  }));
});
