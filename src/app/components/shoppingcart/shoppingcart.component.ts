import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../../dto/shopping-cart';
import { Product } from '../../dto/product';
import { ProductService } from '../../services/product.service';
import { ShoppingItem } from '../../dto/shopping-item';
import { ShoppingCartService } from '../../services/shoppingCart/shopping-cart.service';
import { FacturaService } from '../../services/factura/factura.service';
import { RegisterFactura } from 'src/app/dto/register-factura';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {

  shoppinCart: ShoppingCart = { shoppingItems: [], totalPrice: 0 };
  listShoppingItems: ShoppingItem[];
  userName: string;
  registerFactura: RegisterFactura = null;

  constructor(private servicioProducto: ProductService, private shoppinService: ShoppingCartService, private facturaService: FacturaService) {
    this.registerFactura = {
      factEstado: 'A',
      factFecha: null,
      userName: ''
    };
  }

  ngOnInit() {
    if (localStorage.length > 0 && localStorage.getItem('shopCart')) {
      this.shoppinCart = JSON.parse(localStorage.getItem('shopCart'));
    }
    if (localStorage.length > 0 && localStorage.getItem('session')) {
      this.userName = localStorage.getItem('session');
    }

    this.listShoppingItems = this.shoppinCart.shoppingItems;
    this.shoppinCart.totalPrice = 0;
    this.listShoppingItems.forEach(prod => {
      this.shoppinCart.totalPrice += prod.totalPrice;
    });
    this.shoppinCart.shoppingItems = this.listShoppingItems;
    localStorage.setItem('shopCart', JSON.stringify(this.shoppinCart));
  }

  crearFactura() {
    const sw = confirm('¿Esta Seguro de continuar?');
    if (sw === true) {
      console.log('usuario en session: ', this.userName);
      this.registerFactura.userName = this.userName;
      console.log('prueba registro factura : ', this.registerFactura);
      this.facturaService.crearFactura(this.registerFactura).subscribe(dato => {
      }, error => {
        console.log('Este es el error desde angular: ' + error);
      }, () => {
        console.log('Usuario creado Correctamente');
      });
    }
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

  limpiarShoppingCart() {
    const sw = confirm('¿Esta Seguro de limpiar el carro de compras?');
    if (sw === true) {
      this.listShoppingItems = null;
      this.shoppinCart = { shoppingItems: [], totalPrice: 0 };
      localStorage.setItem('shopCart', JSON.stringify(this.shoppinCart));
      this.shoppinService.loadLocaltorageShopCart();
    }

  }


}
