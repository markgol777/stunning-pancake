import { Component } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  public basket!:any;
  public totalPrice:number = 0;
  public showCart:boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.basket = JSON.parse(localStorage.getItem('basket') || '{}');
    if (!this.basket.length) {
      this.showCart = false;
    }
    for (let i = 0; i < this.basket.length; i++) {
      this.totalPrice += +this.basket[i].price;
    }
  }

  clearCart() {
    localStorage.removeItem('basket');
  }

  order() {
    this.clearCart();
    this.basket = '';
  }
}
