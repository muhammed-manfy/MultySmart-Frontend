import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceledOrderssComponent } from './canceled-orderss.component';

describe('CanceledOrderssComponent', () => {
  let component: CanceledOrderssComponent;
  let fixture: ComponentFixture<CanceledOrderssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanceledOrderssComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanceledOrderssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
