import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MpesaPaymentComponent } from './mpesa-payment/mpesa-payment/mpesa-payment.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/' },
  { path: '', component: MpesaPaymentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
