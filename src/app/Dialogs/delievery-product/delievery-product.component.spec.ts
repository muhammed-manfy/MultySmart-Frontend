import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelieveryProductComponent } from './delievery-product.component';

describe('DelieveryProductComponent', () => {
  let component: DelieveryProductComponent;
  let fixture: ComponentFixture<DelieveryProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelieveryProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelieveryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
