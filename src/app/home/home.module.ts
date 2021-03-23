import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MpesaPaymentModule } from '../mpesa-payment/mpesa-payment.module';
import { ModalModule } from '../core/modal';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, MpesaPaymentModule, ModalModule],
})
export class HomeModule {}
