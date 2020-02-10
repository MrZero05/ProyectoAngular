import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  count: number;

  constructor() {
    this.count = 0;
  }

  addToCart() {

    this.count++;
  }

  removeFromCart() {

    this.count--;
  }
}
