import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MpesaPaymentModule } from '../mpesa-payment/mpesa-payment.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, MpesaPaymentModule],
})
export class HomeModule {}
