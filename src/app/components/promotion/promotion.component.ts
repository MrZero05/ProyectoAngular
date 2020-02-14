import { Component, OnInit } from '@angular/core';

import { Product } from '../../dto/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {
  products: Product[];

  constructor(private service: ProductService) { }

  ngOnInit() {
    this.service.getPromoProducts().subscribe(
      data => {
        console.log(data);
        this.products = data;
      }
    );
  }

}
