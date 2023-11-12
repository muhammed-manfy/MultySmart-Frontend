import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersAdminComponent } from './orders.component';

describe('OffersComponent', () => {
  let component: OrdersAdminComponent;
  let fixture: ComponentFixture<OrdersAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
