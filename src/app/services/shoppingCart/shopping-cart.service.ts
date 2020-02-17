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
  userName: string;

  constructor() {
    this.count = 0;
    this.shoppinCart = { shoppingItems: [], totalPrice: 0, userShoppinCart: '' };
    this.loadLocaltorageShopCart();
  }

  addToCart(prod: Product, qty: number) {
    this.loadLocaltorageShopCart();
    console.log('priducto : ', prod, ' qty', qty);
    // tslint:disable-next-line: max-line-length
    const pi: ShoppingItem = {
      prodId: prod.prodId,
      prodNombre: prod.prodNombre,
      prodDescription: prod.prodDescription,
      prodPrecio: prod.prodPrecio,
      prodImageMain: prod.prodImageMain,
      prodQty: qty,
      totalPrice: (prod.prodPrecio * qty) - ((prod.prodPrecio * qty) * (prod.promId != null ? prod.promId.promPorcetaje : 0) / 100),
      promPorcentaje: prod.promId != null ? prod.promId.promPorcetaje : 0
    };
    this.shoppinCart.shoppingItems.push(pi);
    this.shoppinCart.userShoppinCart = this.userName;
    localStorage.setItem('shopCart', JSON.stringify(this.shoppinCart));
    this.count++;
  }

  removeFromCart() {

    this.count--;
  }

  loadLocaltorageShopCart() {



    if (localStorage.length > 0 && localStorage.getItem('shopCart')) {
      if (this.shoppinCart !== null) {
        this.shoppinCart = JSON.parse(localStorage.getItem('shopCart'));
        console.log('shoppin Cart ' , this.shoppinCart);
        this.userName = localStorage.getItem('session');

        console.log('user shoppin', this.shoppinCart.userShoppinCart);
        console.log('user session', this.userName);
        if (this.shoppinCart.userShoppinCart === this.userName) {
          this.count = this.shoppinCart.shoppingItems.length;
        } else {
          localStorage.removeItem('shopCart');
        }

      }



    }


  }

  getShopCartTotalPrice(items: ShoppingItem[]) {
    const tot: number = items.reduce((sum, b) => sum + b.totalPrice, 0);
    return tot;
  }
}
