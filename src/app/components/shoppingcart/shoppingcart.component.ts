import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../../dto/shopping-cart';
import { Product } from '../../dto/product';
import { ProductService } from '../../services/product.service';
import { ShoppingItem } from '../../dto/shopping-item';
import { ShoppingCartService } from '../../services/shoppingCart/shopping-cart.service';
import { FacturaService } from '../../services/factura/factura.service';
import { RegisterFactura } from 'src/app/dto/register-factura';
import { DetalleFactura } from '../../dto/detalleFactura';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {

  shoppinCart: ShoppingCart = { shoppingItems: [], totalPrice: 0, userShoppinCart: '' };
  listShoppingItems: ShoppingItem[];
  userName: string;
  registerFactura: RegisterFactura = null;
  listDetalleFactura: DetalleFactura[];
  detFact: DetalleFactura;

  constructor(private servicioProducto: ProductService, private shoppinService: ShoppingCartService, private facturaService: FacturaService) {
    this.registerFactura = {
      factEstado: 'A',
      factFecha: null,
      userName: '',
      listDetalleFactura: [{
        detfactId: null,
        detfactCantidad: null,
        detfactValor: null,
        factId: null,
        prodId: null,
        porcDescuento: null,
        porcValor: null
      }]
    };
    this.detFact = {
      detfactId: null,
      detfactCantidad: null,
      detfactValor: null,
      factId: null,
      prodId: null,
      porcDescuento: null,
      porcValor: null
    }
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
      console.log('objero factura antes', this.registerFactura);
      for (let index = 0; index < this.shoppinCart.shoppingItems.length; index++) {
        this.detFact.detfactCantidad = this.shoppinCart.shoppingItems[index].prodQty;
        this.detFact.detfactValor = this.shoppinCart.shoppingItems[index].totalPrice;
        this.detFact.prodId = parseInt(this.shoppinCart.shoppingItems[index].prodId);
        this.detFact.porcDescuento = this.shoppinCart.shoppingItems[index].promPorcentaje;
        this.detFact.porcValor = (this.detFact.detfactValor * this.detFact.porcDescuento) / 100;
        this.registerFactura.listDetalleFactura.push(this.detFact);
      }
      this.registerFactura.userName = this.userName;
      this.facturaService.crearFactura(this.registerFactura).subscribe(dato => {
        this.listShoppingItems = null;
        this.shoppinCart = { shoppingItems: [], totalPrice: 0, userShoppinCart: '' };
        localStorage.setItem('shopCart', JSON.stringify(this.shoppinCart));
        this.shoppinService.loadLocaltorageShopCart();
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
      this.shoppinCart = { shoppingItems: [], totalPrice: 0, userShoppinCart: '' };
      localStorage.setItem('shopCart', JSON.stringify(this.shoppinCart));
      this.shoppinService.loadLocaltorageShopCart();
    }

  }


}
