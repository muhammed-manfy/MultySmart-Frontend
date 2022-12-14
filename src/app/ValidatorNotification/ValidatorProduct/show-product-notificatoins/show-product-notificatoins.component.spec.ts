import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductNotificatoinsComponent } from './show-product-notificatoins.component';

describe('ShowProductNotificatoinsComponent', () => {
  let component: ShowProductNotificatoinsComponent;
  let fixture: ComponentFixture<ShowProductNotificatoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProductNotificatoinsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowProductNotificatoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
