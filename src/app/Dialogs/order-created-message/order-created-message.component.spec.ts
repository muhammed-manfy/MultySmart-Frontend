import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCreatedMessageComponent } from './order-created-message.component';

describe('OrderCreatedMessageComponent', () => {
  let component: OrderCreatedMessageComponent;
  let fixture: ComponentFixture<OrderCreatedMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderCreatedMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCreatedMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
