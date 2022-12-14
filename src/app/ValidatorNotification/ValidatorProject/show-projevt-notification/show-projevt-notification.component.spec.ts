import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProjevtNotificationComponent } from './show-projevt-notification.component';

describe('ShowProjevtNotificationComponent', () => {
  let component: ShowProjevtNotificationComponent;
  let fixture: ComponentFixture<ShowProjevtNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProjevtNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowProjevtNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
