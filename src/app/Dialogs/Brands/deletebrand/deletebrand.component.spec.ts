import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletebrandComponent } from './deletebrand.component';

describe('DeletebrandComponent', () => {
  let component: DeletebrandComponent;
  let fixture: ComponentFixture<DeletebrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletebrandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletebrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
