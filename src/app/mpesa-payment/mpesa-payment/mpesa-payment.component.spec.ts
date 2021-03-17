import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpesaPaymentComponent } from './mpesa-payment.component';

describe('MpesaPaymentComponent', () => {
  let component: MpesaPaymentComponent;
  let fixture: ComponentFixture<MpesaPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpesaPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpesaPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
