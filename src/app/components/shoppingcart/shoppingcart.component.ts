import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../../dto/shopping-cart';
import { Product } from '../../dto/product';
import { ProductService } from '../../services/product.service';
import { ShoppingItem } from '../../dto/shopping-item';
import { ShoppingCartService } from '../../services/shoppingCart/shopping-cart.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {

  shoppinCart: ShoppingCart = { shoppingItems: [], totalPrice: 0 };
  listShoppingItems: ShoppingItem[];

  constructor(private servicioProducto: ProductService, private shoppinService: ShoppingCartService) {

  }

  ngOnInit() {
    if (localStorage.length > 0 && localStorage.getItem('shopCart')) {
      this.shoppinCart = JSON.parse(localStorage.getItem('shopCart'));
    }
    this.listShoppingItems = this.shoppinCart.shoppingItems;
    this.shoppinCart.totalPrice = 0;
    this.listShoppingItems.forEach(prod => {
      this.shoppinCart.totalPrice += prod.totalPrice;
    });
    this.shoppinCart.shoppingItems = this.listShoppingItems;
    localStorage.setItem('shopCart', JSON.stringify(this.shoppinCart));
  }

  updateProductQty(prod: ShoppingItem, newQty: number) {
    console.log('product ', prod);
    console.log(' Cantidad ', newQty);
    if (newQty > 0) {
      const p = this.listShoppingItems.find(pr => pr.prodId === prod.prodId);
      p.prodQty = newQty;
      p.totalPrice = Number(newQty) * Number(p.prodPrecio);
      this.shoppinCart.shoppingItems = this.listShoppingItems;

      this.shoppinCart.totalPrice = 0;
      this.listShoppingItems.forEach(pro => {
        this.shoppinCart.totalPrice += pro.totalPrice;
      });

      localStorage.setItem('shopCart', JSON.stringify(this.shoppinCart));
    }
  }

  removerItem(index: number) {
    const sw = confirm('¿Esta Seguro de eliminar el producto?');
    if (sw === true) {
      this.listShoppingItems.splice(index, 1);
      this.shoppinCart.shoppingItems = this.listShoppingItems;

      this.shoppinCart.totalPrice = 0;
      this.listShoppingItems.forEach(pro => {
        this.shoppinCart.totalPrice += pro.totalPrice;
      });
      localStorage.setItem('shopCart', JSON.stringify(this.shoppinCart));
      alert('Producto Eliminado Correctamente');
      this.shoppinService.loadLocaltorageShopCart();
    }
  }




}
