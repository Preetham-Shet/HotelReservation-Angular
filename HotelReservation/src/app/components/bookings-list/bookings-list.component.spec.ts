import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsListComponent } from './bookings-list.component';

describe('BookingsListComponent', () => {
  let component: BookingsListComponent;
  let fixture: ComponentFixture<BookingsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingsListComponent]
    });
    fixture = TestBed.createComponent(BookingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
