import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/dto/product';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shoppingCart/shopping-cart.service';
import { ShoppingCart } from '../../dto/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  id: any;
  product: Product;
  swBotonAgregar: boolean;
  shoppinCart: ShoppingCart = { shoppingItems: [], totalPrice: 0 , userShoppinCart: ''};

  constructor(private route: ActivatedRoute, private productServie: ProductService, private shoppingCart: ShoppingCartService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.showProductById(this.id);
    if (localStorage.length > 0 && localStorage.getItem('shopCart')) {
      this.shoppinCart = JSON.parse(localStorage.getItem('shopCart'));
    }
    this.swBotonAgregar = false;
  }

  ngOnInit() {
  }

  showProductById(id: any) {
    this.productServie.getProductById(id).subscribe(
      data => {
        this.product = data;
        this.shoppinCart.shoppingItems.forEach(prod => {
          if (prod.prodId === this.product.prodId) {
            this.swBotonAgregar = true;
          }
        });
      }
    );

    /* only for test efects
    const p: Product = {productId: '123', prodName: 'name', prodDescription: 'desc', prodPrice: 150000};
    p.prodName = 'name';
    this.product = p; */
  }

  addToCart($event: any) {
    $event.preventDefault();
    this.shoppingCart.addToCart(this.product, 1);
    this.swBotonAgregar = true;
  }
}
