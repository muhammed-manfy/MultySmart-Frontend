import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAdminLoginNotificationsComponent } from './show-admin-login-notifications.component';

describe('ShowOfferNotificationsComponent', () => {
  let component: ShowAdminLoginNotificationsComponent;
  let fixture: ComponentFixture<ShowAdminLoginNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAdminLoginNotificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAdminLoginNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
