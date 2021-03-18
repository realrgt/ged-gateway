import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayPurchase: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  public onPurchase(): void {
    this.displayPurchase = !this.displayPurchase;
  }
}
