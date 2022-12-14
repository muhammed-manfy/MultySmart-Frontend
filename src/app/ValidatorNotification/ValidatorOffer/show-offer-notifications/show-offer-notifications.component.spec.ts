import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOfferNotificationsComponent } from './show-offer-notifications.component';

describe('ShowOfferNotificationsComponent', () => {
  let component: ShowOfferNotificationsComponent;
  let fixture: ComponentFixture<ShowOfferNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowOfferNotificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowOfferNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
