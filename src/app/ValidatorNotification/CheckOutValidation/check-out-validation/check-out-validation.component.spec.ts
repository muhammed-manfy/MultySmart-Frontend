import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutValidationComponent } from './check-out-validation.component';

describe('CheckOutValidationComponent', () => {
  let component: CheckOutValidationComponent;
  let fixture: ComponentFixture<CheckOutValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckOutValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckOutValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
