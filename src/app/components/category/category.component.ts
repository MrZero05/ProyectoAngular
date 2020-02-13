import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Product } from '../../dto/product';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: any;
  products: Product[];

  constructor(private route: ActivatedRoute,
              private service: ProductService) { }

  ngOnInit() {
    // get category param filter
    this.category = this.route.snapshot.paramMap.get('id');
    console.log('categoria: ', this.category);
    this.service.getProductByCategory(this.category).subscribe(
      data => {
        console.log(data);
        this.products = data;
      }
    );

   /*  this.route.paramMap.subscribe( paramMap => {
      this.bankName = paramMap.get('bank');
  }) */
  }

}
