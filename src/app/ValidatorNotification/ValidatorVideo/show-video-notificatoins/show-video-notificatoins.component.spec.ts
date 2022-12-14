import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVideoNotificatoinsComponent } from './show-video-notificatoins.component';

describe('ShowVideoNotificatoinsComponent', () => {
  let component: ShowVideoNotificatoinsComponent;
  let fixture: ComponentFixture<ShowVideoNotificatoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowVideoNotificatoinsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowVideoNotificatoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
