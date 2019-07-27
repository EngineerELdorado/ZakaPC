import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteSaleComponent } from './confirm-delete-sale.component';

describe('ConfirmDeleteSaleComponent', () => {
  let component: ConfirmDeleteSaleComponent;
  let fixture: ComponentFixture<ConfirmDeleteSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
