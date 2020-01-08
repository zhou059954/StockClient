import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculeComponent } from './calcule.component';

describe('CalculeComponent', () => {
  let component: CalculeComponent;
  let fixture: ComponentFixture<CalculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
