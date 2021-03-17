import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MpesaPaymentComponent } from './mpesa-payment.component';

@NgModule({
  declarations: [MpesaPaymentComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  exports: [MpesaPaymentComponent],
})
export class MpesaPaymentModule {}
