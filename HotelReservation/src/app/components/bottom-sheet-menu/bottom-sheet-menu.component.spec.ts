import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetMenuComponent } from './bottom-sheet-menu.component';

describe('BottomSheetMenuComponent', () => {
  let component: BottomSheetMenuComponent;
  let fixture: ComponentFixture<BottomSheetMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BottomSheetMenuComponent]
    });
    fixture = TestBed.createComponent(BottomSheetMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
