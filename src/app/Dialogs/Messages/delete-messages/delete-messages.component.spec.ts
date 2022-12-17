import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMessagesComponent } from './delete-messages.component';

describe('DeleteMessagesComponent', () => {
  let component: DeleteMessagesComponent;
  let fixture: ComponentFixture<DeleteMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
