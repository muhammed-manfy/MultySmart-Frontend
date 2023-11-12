import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelieveryOrdersComponent } from './delievery-orders.component';

describe('DelieveryOrdersComponent', () => {
  let component: DelieveryOrdersComponent;
  let fixture: ComponentFixture<DelieveryOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelieveryOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelieveryOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
