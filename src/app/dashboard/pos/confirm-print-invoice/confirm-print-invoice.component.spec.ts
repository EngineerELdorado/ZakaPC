import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPrintInvoiceComponent } from './confirm-print-invoice.component';

describe('ConfirmPrintInvoiceComponent', () => {
  let component: ConfirmPrintInvoiceComponent;
  let fixture: ComponentFixture<ConfirmPrintInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmPrintInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPrintInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
