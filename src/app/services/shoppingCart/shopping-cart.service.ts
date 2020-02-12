import { Injectable } from '@angular/core';
import { Product } from 'src/app/dto/product';
import { ShoppingCart } from 'src/app/dto/shopping-cart';
import { ShoppingItem } from 'src/app/dto/shopping-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shoppinCart: ShoppingCart;
  count: number;

  constructor() {
    this.count = 0;
    this.shoppinCart = {shoppingItems: [], totalPrice: 0};
  }

  addToCart(prod: Product, qty: number) {
    this.loadSessionStorageShopCart();

    const pi: ShoppingItem = {prodId: prod.productId, prodQty: qty, unitPrice: prod.prodPrice, totalPrice: (prod.prodPrice * qty)};
    this.shoppinCart.shoppingItems.push(pi);

    sessionStorage.setItem('shopCart', JSON.stringify(this.shoppinCart));
    this.count++;
  }

  removeFromCart() {

    this.count--;
  }

  loadSessionStorageShopCart() {
    if (sessionStorage.length > 0 && sessionStorage.getItem('shopCart')) {
      this.shoppinCart = JSON.parse(sessionStorage.getItem('shopCart'));
    }
  }

  getShopCartTotalPrice(items: ShoppingItem[]) {
    const tot: number = items.reduce( (sum, b) => sum + b.totalPrice, 0);
    return tot;
  }
}
