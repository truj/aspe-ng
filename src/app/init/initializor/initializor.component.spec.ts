import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitializorComponent } from './initializor.component';

describe('InitializorComponent', () => {
  let component: InitializorComponent;
  let fixture: ComponentFixture<InitializorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitializorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitializorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
