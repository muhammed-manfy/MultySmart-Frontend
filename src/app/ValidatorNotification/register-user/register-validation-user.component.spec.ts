import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserValidationComponent } from './register-validation-user.component';

describe('RegisterUserValidationComponent', () => {
  let component: RegisterUserValidationComponent;
  let fixture: ComponentFixture<RegisterUserValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterUserValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterUserValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
