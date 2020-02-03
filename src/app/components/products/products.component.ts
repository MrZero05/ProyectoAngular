import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/dto/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  id: any;
  product: Product;

  constructor(private route: ActivatedRoute,
              private productServie: ProductService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.showProductById(this.id);
  }

  ngOnInit() {
  }

  showProductById(id: any) {
    this.productServie.getProductById(id).subscribe(
      data => {
        console.log(data[0]);
        this.product = data[0];
      }
    );
  }
}
